import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal as ModalComponent, RVModal } from '.';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  argTypes: {} as RVModal,
} as unknown as ComponentMeta<typeof ModalComponent>;

const Template: ComponentStory<typeof ModalComponent> = ({
  isOpen,
  ...args
}) => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eum
      voluptatem accusantium sapiente nisi dignissimos ea cum laudantium
      veritatis, aliquam itaque adipisci voluptate nobis voluptatibus reiciendis
      nam explicabo totam qui. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Sequi eum voluptatem accusantium sapiente nisi
      dignissimos ea cum laudantium veritatis, aliquam itaque adipisci voluptate
      nobis voluptatibus reiciendis nam explicabo totam qui. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Sequi eum voluptatem accusantium
      sapiente nisi dignissimos ea cum laudantium veritatis, aliquam itaque
      adipisci voluptate nobis voluptatibus reiciendis nam explicabo totam qui.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eum
      voluptatem accusantium sapiente nisi dignissimos ea cum laudantium
      veritatis, aliquam itaque adipisci voluptate nobis voluptatibus reiciendis
      nam explicabo totam qui. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Sequi eum voluptatem accusantium sapiente nisi
      dignissimos ea cum laudantium veritatis, aliquam itaque adipisci voluptate
      nobis voluptatibus reiciendis nam explicabo totam qui. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Sequi eum voluptatem accusantium
      sapiente nisi dignissimos ea cum laudantium veritatis, aliquam itaque
      adipisci voluptate nobis voluptatibus reiciendis nam explicabo totam qui.
      <ModalComponent isOpen={isOpen} {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eum
        voluptatem accusantium sapiente nisi dignissimos ea cum laudantium
        veritatis, aliquam itaque adipisci voluptate nobis voluptatibus
        reiciendis nam explicabo totam qui. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Sequi eum voluptatem accusantium sapiente
        nisi dignissimos ea cum laudantium veritatis, aliquam itaque adipisci
        voluptate nobis voluptatibus reiciendis nam explicabo totam qui. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Sequi eum voluptatem
        accusantium sapiente nisi dignissimos ea cum laudantium veritatis,
        aliquam itaque adipisci voluptate nobis voluptatibus reiciendis nam
        explicabo totam qui.
      </ModalComponent>
    </div>
  );
};
export const Modal = Template.bind({});
