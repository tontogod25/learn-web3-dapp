import React from 'react';
import {Divider, Popover, Typography} from 'antd';
import IdentityItem from '@figment-ceramic/components/auth/IdentityItem';
import {useIdx} from '@figment-ceramic/context/idx';

type IdentityPopoverProps = {
  children: JSX.Element;
  actions: JSX.Element[];
};

const IdentityPopover = (props: IdentityPopoverProps): JSX.Element => {
  const {children, actions} = props;
  const {currentUserAddress, currentUserDID, currentUserData} = useIdx();

  const PopoverContent = (
    <>
      <Typography.Title level={5}>Your identity</Typography.Title>
      <Divider style={{marginTop: 5, marginBottom: 15}} />
      <IdentityItem label="Address" value={currentUserAddress} slice />
      <IdentityItem label="DID" value={currentUserDID} slice />
      <IdentityItem label="Name" value={currentUserData?.basicProfile?.name} />
      <Divider style={{marginTop: 5, marginBottom: 15}} />
      {actions}
    </>
  );

  return (
    <Popover
      content={PopoverContent}
      placement="bottomLeft"
      overlayInnerStyle={{width: 300}}
    >
      {children}
    </Popover>
  );
};

export default IdentityPopover;
