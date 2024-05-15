import clsx from "clsx";
import { styled } from "@mui/system";
import { useSwitch } from "@mui/base/useSwitch";

const blue = {
  700: "#0059B2"
};

const grey = {
  400: "#BFC7CF",
  800: "#2F3A45"
};

const SwitchRoot = styled("span")`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 25px;
  padding: 8px;
`;

const SwitchInput = styled("input")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled("span")`
  position: absolute;
  display: block;
  background-color: #f06e4b;
  width: 35px;
  height: 20px;
  -webkit-border-radius: 75px;
  -moz-border-radius: 75px;
  border-radius: 75px;
  top: 11px;
  left: 11px;
  color:#fff;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: "User";
    width: 100%;
    height: 100%;
    margin:2px 0px 0px 6px;
    font-size:10px;
    font-weight:bold;
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(17px);
    background:#376ea5;

    &::before {
      content: "Admin";
      margin:2px 0px 0px 2px;
      font-size:10px;
      font-weight:bold;
    }
  }
`;

const SwitchTrack = styled("span")(
  ({ theme }) => `
  background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[400]};
  border-radius: 4px;
  width: 60px;
  height: 28px;
  display: block;
  -webkit-border-radius: 75px;
  -moz-border-radius: 75px;
  border-radius: 75px;
`
);

function CustomAdminSwitch({ checked, onChange }) {
  return (
    <SwitchRoot>
      <SwitchTrack />
      <SwitchThumb className={clsx({ checked })} />
      <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
    </SwitchRoot>
  );
}

export default CustomAdminSwitch;
