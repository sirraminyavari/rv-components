import React, { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  ServerManagementRowDetails as ServerManagementRowDetails,
  RVServerManagementRowDetails,
} from '.';
import { Button } from '../../../components';

export default {
  title: 'views/Server Management/DetailsPanel',
  component: ServerManagementRowDetails,
  argTypes: {} as RVServerManagementRowDetails,
} as unknown as ComponentMeta<typeof ServerManagementRowDetails>;

export const DetailsPanel: ComponentStory<typeof ServerManagementRowDetails> = ({
  title = 'Result details',
  isOpen,
  onClose,
  details: defaultDetails,
  ...args
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<typeof defaultDetails>(defaultDetails);
  const onCloseCallback = () => {
    setIsModalOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setDetails(undefined);
    const timer = setTimeout(() => {
      setDetails({
        'my details data 3': 435,
        'my details data 4':
          'author lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, magnam sint ipsa eum perferendis quia! Tenetur quos quisquam nostrum, voluptatibus veniam harum sed dolorum, enim repudiandae non aliquam reprehenderit earum? ',
        'my details data 2': null,
        'my details data 5': 'Wisely',
        'my details data 6': 'Cocoa',
        'my details data 1': null,
        'my details data 7': '43534588-xcvxvxcv',
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isModalOpen]);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>open details</Button>
      <ServerManagementRowDetails
        title={title}
        isOpen={isOpen || isModalOpen}
        onClose={onCloseCallback}
        details={details}
        {...args}
      />
    </>
  );
};
