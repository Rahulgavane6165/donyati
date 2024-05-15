import React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';

const SwitchRoot = styled("span")`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 21px;
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
  width: 16px;
  height: 16px;
  border-radius: 75px;
  top: 2px;
  left: 11px;
  color: #fff;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: "${(props) => (props.checked ? "W" : "R")}";
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
  }

  &.checked {
    transform: translateX(17px);
    background: #376ea5;

    &::before {
      content: "W";
    }
  }
`;

const SwitchTrack = styled("span")`
  background-color: #ddd;
  border-radius: 25px;
  width: 100%;
  height: 22px;
  display: block;
  position: absolute;
  bottom: 1px; 
`;

function CustomSwitch({ checked, onChange }) {
  return (
    <SwitchRoot>
      <SwitchTrack />
      <SwitchThumb className={clsx({ checked })} />
      <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
    </SwitchRoot>
  );
}

export default CustomSwitch;
