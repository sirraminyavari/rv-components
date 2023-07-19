import React, { forwardRef, useMemo, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PeoplePicker as PeoplePickerComponent, RVPeoplePicker } from '.';
import { Button, RVButton } from '../Button';
import { PersonCircleSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PeoplePicker',
  component: PeoplePickerComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVPeoplePicker,
} as ComponentMeta<typeof PeoplePickerComponent>;

const TriggerButton = (initialProps) =>
  forwardRef<HTMLButtonElement, HTMLButtonElement>((props, ref) => (
    <Button
      fullCircle
      rounded="half"
      {...({ ...initialProps, ...props, ref } as unknown as RVButton)}
    >
      <PersonCircleSvg />
    </Button>
  ));
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PeoplePickerComponent> = ({
  label = 'label',
  TriggerButtonElement,
  peopleList = [
    {
      id: 'testid1',
      label: 'Me',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: true,
    },
    {
      id: 'testid2',
      label: 'John Constantine',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: false,
    },
    {
      id: 'testid3',
      label: 'Maria Sharapova',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: false,
    },
    {
      id: 'testid11',
      label: 'Giorgia Whigham',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: false,
    },
    {
      id: 'testid21',
      label: 'JJ Cole',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: false,
    },
    {
      id: 'testid31',
      label: 'Anthony blinken',
      avatarSrc: 'https://i.pravatar.cc/300',
      selected: false,
    },
    {
      label: 'Deborah Ann Woll',
      id: 'testid41',
      selected: false,
    },
    {
      label: 'Benicio Del Toro',
      id: 'testid4',
      selected: false,
    },
  ],
  color,
  variant,
  ...args
}) => {
  const [searchInput, setSearchInput] = useState('');
  const memoizedPeopleList = useMemo(
    () =>
      peopleList.filter((item) =>
        String(item.label).toLocaleLowerCase()?.includes(searchInput.toLocaleLowerCase())
      ),
    [searchInput]
  );
  return (
    <div
      style={{
        minHeight: '150vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PeoplePickerComponent
        label={label}
        TriggerButtonElement={TriggerButtonElement || TriggerButton({ color, variant })}
        peopleList={memoizedPeopleList}
        onSearch={setSearchInput}
        {...{ ...args, color, variant }}
      />
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const PeoplePicker = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
