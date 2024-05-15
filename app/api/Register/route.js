import { checkEmailExists, createUser } from '../model/user';

import { NextResponse } from "next/server";
import { sendWelcomeEmail } from '../server/utils/sendEmail';

export const POST = async (req, res) => {
    const { email, password, checkbox1, checkbox2, checkbox3, userType } = await req.json();

    try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        const newUser = await createUser(null, email, password, checkbox1, checkbox2, checkbox3, userType);
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        else{
            await sendWelcomeEmail(email);
        }

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
    }
};
