import React, { FunctionComponent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SidebarMain as SidebarMainComponent } from '../components/Sidebar/Main';
import { SidebarSubMenu as SidebarSubMenuComponent } from '../components/Sidebar/SubMenu';
import {
  BookmarkSvg,
  BriefcaseSvg,
  ChartColumnBarSvg,
  ChatBubblesSvg,
  CMLogoSvg,
  DashboardSvg,
  FileTrayFullSvg,
  FunnelSvg,
  GridSvg,
  HammerWrenchSvg,
  HelpCircleSvg,
  HomeSvg,
  MenuSvg,
  NotificationSvg,
  PeopleCircleSvg,
  SearchSvg,
  SettingsSvg,
  ShapesSvg,
  SocialSvg,
  AlbumsSvg,
  ReaderSvg,
  ChatBubbleSvg,
  ArrowCircleSvg,
  CalendarSvg,
} from '../icons';
import {
  Avatar,
  Button,
  RowItem,
  RVColorProp,
  RVSizeProp,
  RVVariantProp,
  TextAreaInput,
  TextInput,
  Typography,
} from '..';
import { Breadcrumb } from '../components/Breadcrumb';
import { Select } from '../components/SelectInput';
import { DatePicker } from '../components/DatePicker';
import { SideMenu } from '../components/SideMenu';

export default {
  title: 'Demo/NodePage',
  argTypes: {
    color: {
      control: {
        type: 'select',
        labels: RVColorProp,
      },
    },
    variant: {
      control: {
        type: 'radio',
        labels: RVVariantProp,
      },
    },
    size: {
      control: {
        type: 'radio',
        labels: RVSizeProp,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidebarSubMenuComponent>;

export const NodePage: ComponentStory<FunctionComponent> = ({ ...args }) => {
  const [sideMenuStatus, setSideMenuStatus] = useState<boolean>(true);
  const [isActionBarOpen, setIsActionBarOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <div style={{ display: 'flex', height: '100vh', position: 'sticky', top: 0 }}>
        <SidebarMainComponent
          primaryLinks={[
            !isActionBarOpen
              ? {
                  Icon: MenuSvg,
                  title: '',
                  onClick: () => {
                    setIsActionBarOpen((prev) => !prev);
                  },
                  noIndicator: true,
                  menuTrigger: true,
                }
              : {
                  Icon: CMLogoSvg,
                  title: '',
                  onClick: () => {},
                  noIndicator: true,
                },
            {
              Icon: HomeSvg,
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: NotificationSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: SocialSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: BriefcaseSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: ChatBubblesSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: ShapesSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: HammerWrenchSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: DashboardSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: ChartColumnBarSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: SettingsSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
          ]}
          secondaryLinks={[
            {
              Icon: HelpCircleSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
            {
              Icon: AlbumsSvg,
              title: '',
              onClick: () => {},
              noIndicator: false,
            },
          ]}
          {...args}
        />
        <SidebarSubMenuComponent
          open={isActionBarOpen}
          CloseTrigger={setIsActionBarOpen}
          links={[
            { badge: 1265, title: 'Everything', Icon: GridSvg },
            { badge: 23, title: 'Bookmarked', Icon: BookmarkSvg },
            { badge: 11, title: 'Drafts', Icon: FileTrayFullSvg },
            {
              input: true,
              color: RVColorProp.distant,
              title: 'Drafts',
              Icon: FunnelSvg,
            },
            {
              title: 'Documents',
              Icon: HomeSvg,
              badge: 22,
              childItems: [
                { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
                { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              ],
            },
            {
              title: 'Files',
              Icon: HomeSvg,
              badge: 22,
              childItems: [
                { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
                { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              ],
            },
          ]}
          {...args}
        />
      </div>
      <div
        style={{
          width: '100%',
          paddingInline: '2rem',
          paddingBlock: '1.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Breadcrumb
              Icon={FileTrayFullSvg}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              routeLinks={[
                { label: 'Citations', path: '' },
                {
                  label: 'NodePage',
                  path: '',
                  adjacentPaths: [
                    { label: 'Citations', path: '' },
                    { label: 'Citations', path: '' },
                    { label: 'Citations', path: '' },
                  ],
                },
              ]}
            />
          </div>
          <div style={{ width: '100%', maxWidth: 490 }}>
            <TextInput
              label="Search in Researchers team"
              variant={RVVariantProp.outline}
              color={RVColorProp.distant}
              Icon={SearchSvg}
              fullWidth
            />
          </div>
        </div>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div style={{ width: '100%' }}>
            <div
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBlock: '1rem',
              }}
            >
              <RowItem
                size={RVSizeProp.small}
                ActionsComponent={
                  <div
                    style={{
                      display: 'flex',
                      columnGap: '.5rem',
                    }}
                  >
                    <Button variant={RVVariantProp.white}>back</Button>
                    <Button fullWidth noWrap style={{ width: 200 }}>
                      <ArrowCircleSvg width="1.3em" height="1.3em" direction="up" />
                      publish
                    </Button>
                  </div>
                }
              >
                <Typography type="H1">
                  CliqMind UX writing improvement and other correction
                </Typography>
              </RowItem>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 490,
                  marginBlock: '',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '1rem',
                  paddingInlineStart: '2rem',
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/300"
                  fullCircle
                  variant={RVVariantProp.white}
                  size={RVSizeProp.medium}
                />
              </div>
              <div
                style={{
                  marginBlock: '',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '1rem',
                }}
              >
                <Button rounded="half" fullCircle variant={RVVariantProp.white}>
                  <BookmarkSvg outline />
                </Button>
                <Button rounded="half" fullCircle variant={RVVariantProp.white}>
                  <ChatBubbleSvg outline />
                </Button>
                <Button
                  rounded="half"
                  fullCircle
                  variant={RVVariantProp.white}
                  active={sideMenuStatus}
                  onClick={() => {
                    setSideMenuStatus((prev) => !prev);
                  }}
                >
                  <ReaderSvg outline />
                </Button>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  marginBlock: '4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <div
                    style={{
                      flexBasis: '20%',
                    }}
                  >
                    <span
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <AlbumsSvg style={{ fontSize: '1.5rem' }} />
                      Text Area component
                    </span>
                  </div>
                  <>
                    <TextAreaInput
                      rows={6}
                      fullWidth
                      label="placeholder ..."
                      color={RVColorProp.distant}
                      variant={RVVariantProp.outline}
                    />
                  </>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <div
                    style={{
                      flexBasis: '20%',
                    }}
                  >
                    <span
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <AlbumsSvg style={{ fontSize: '1.5rem' }} />
                      Text Area component
                    </span>
                  </div>
                  <>
                    <TextInput
                      fullWidth
                      label="placeholder ..."
                      color={RVColorProp.distant}
                      variant={RVVariantProp.outline}
                    />
                  </>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <div
                    style={{
                      flexBasis: '20%',
                    }}
                  >
                    <span
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <CalendarSvg style={{ fontSize: '1.5rem' }} />
                      Date picker component
                    </span>
                  </div>
                  <>
                    <DatePicker
                      fullWidth
                      label="placeholder ..."
                      color={RVColorProp.distant}
                      variant={RVVariantProp.outline}
                    />
                  </>
                </div>
                <div
                  style={{
                    marginBlock: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                  }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div
                      style={{
                        flexBasis: '20%',
                      }}
                    >
                      <span
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <AlbumsSvg style={{ fontSize: '1.5rem' }} />
                        select component
                      </span>
                    </div>
                    <>
                      <Select
                        options={[
                          { label: 'test', value: 'test' },
                          { label: 'test1', value: 'test' },
                          { label: 'test2', value: 'test' },
                          { label: 'test3', value: 'test' },
                        ]}
                        placeholder="placeholder ..."
                        color={RVColorProp.distant}
                        variant={RVVariantProp.outline}
                      />
                    </>
                  </div>
                </div>
                <div
                  style={{
                    marginBlock: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                  }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div
                      style={{
                        flexBasis: '20%',
                      }}
                    >
                      <span
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <AlbumsSvg style={{ fontSize: '1.5rem' }} />
                        multiselect component
                      </span>
                    </div>
                    <>
                      <Select
                        style={{ width: '100%' }}
                        isMulti
                        isClearable
                        options={[
                          { label: 'test', value: 'test' },
                          { label: 'test1', value: 'test' },
                          { label: 'test2', value: 'test' },
                          { label: 'test3', value: 'test' },
                        ]}
                        placeholder="placeholder ..."
                        color={RVColorProp.distant}
                        variant={RVVariantProp.outline}
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SideMenu height="100%" width="350px" open={sideMenuStatus}>
            <div
              style={{
                height: '90vh',
                width: 350,
                padding: 12,
                overflow: 'hidden',
                position: 'sticky',
                top: 0,
              }}
            >
              <p style={{ overflow: 'hidden' }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ipsum maiores
                veritatis neque quas minus voluptas beatae corporis, est molestias veniam,
                blanditiis fugiat commodi in! Repudiandae mollitia accusamus assumenda obcaecati?
              </p>
            </div>
          </SideMenu>
        </div>
      </div>
    </div>
  );
};
