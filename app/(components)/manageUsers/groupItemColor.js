// GroupItem.js

import {colors} from "../common/constants";

const GroupItem = ({ value }) => {
  return (
    <div className={`text-white mb-2 flex justify-center rounded-full p-1 px-3 }`}
    style={{ background: colors[value.trim()]}}
    >
      {value.trim()}
    </div>
  );
};

export default GroupItem; // Make sure to export the component



