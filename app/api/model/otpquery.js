import { pool } from "../server/Lib/database";
import { sendOTPEmail } from "../server/utils/sendEmail";

const createDeleteExpiredOTPFunction = `
  CREATE OR REPLACE FUNCTION delete_expired_otp()
  RETURNS TRIGGER AS $$
  BEGIN
    PERFORM pg_notify('delete_otp', NEW.id::text);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

const createScheduleOTPDeletionTrigger = `
  CREATE TRIGGER schedule_otp_deletion
  AFTER INSERT OR UPDATE OF otp ON users
  FOR EACH ROW
  WHEN (NEW.otp IS NOT NULL)
  EXECUTE FUNCTION delete_expired_otp();
`;

async function createTriggerAndFunctionIfNotExists() {
  const client = await pool.connect();

  try {
    // Check if the function exists
    const checkFunctionQuery = `
      SELECT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'delete_expired_otp' ); `;
    const {
      rows: [functionExists],
    } = await client.query(checkFunctionQuery);

    // Create the function if it does not exist
    if (!functionExists.exists) {
      await client.query(createDeleteExpiredOTPFunction);
      console.log("Function created: delete_expired_otp");
    }

    // Check if the trigger exists
    const checkTriggerQuery = `
      SELECT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'schedule_otp_deletion' ); `;
    const {
      rows: [triggerExists],
    } = await client.query(checkTriggerQuery);

    // Create the trigger if it does not exist
    if (!triggerExists.exists) {
      await client.query(createScheduleOTPDeletionTrigger);
      console.log("Trigger created: schedule_otp_deletion");
    }
  } catch (error) {
    console.error("Error creating trigger and function:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the trigger and function if they do not exist
createTriggerAndFunctionIfNotExists();

// Function to set otp for reset password

const setOTP = async (email) => {
  const otp = Math.floor(1000 + Math.random() * 9000);

  try {
    const client = await pool.connect();
    const query = `
      UPDATE users
      SET otp = $1, otp_expiry = current_timestamp + interval '2 minutes'
      WHERE email = $2
    `;
    await client.query(query, [otp, email]);
    client.release();

    // Send OTP email (Assuming sendOTPEmail function sends the email)
    await sendOTPEmail(email, otp);

    return { message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error setting OTP:", error);
    throw new Error("Error setting OTP");
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT email FROM users
      WHERE email = $1 AND otp = $2 AND otp_expiry > NOW()
    `;
    const { rows } = await client.query(query, [email, otp]);

    if (rows.length === 1) {
      // If OTP is verified, update the OTP and expiry columns to null
      const updateQuery = `
        UPDATE users
        SET otp = NULL, otp_expiry = NULL
        WHERE email = $1 AND otp = $2
      `;
      await client.query(updateQuery, [email, otp]);
      client.release();
      return { message: "OTP verified successfully" };
    } else {
      return { error: "Invalid OTP" };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Error verifying OTP");
  }
};


export { setOTP, verifyOTP };
