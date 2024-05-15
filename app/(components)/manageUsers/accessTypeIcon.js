import { colors } from "../common/constants";

const AccessTypeIcon = ({ label, value }) => {
    return (
      <div className={`text-white rounded p-1 w-6 mb-2 flex justify-center border}`}
      style={{ background: colors[label]}}
      >
        {value ? "W" : "R"}
      </div>
    );
  };
  
  export default AccessTypeIcon;












   // const colors = {
    //   CloudAssurance: "bg-violet-600",
    //   KPI: "bg-lime-600",
    //   Allocation: "bg-black",
    // };
  
    // const bgColor =  colors[label];