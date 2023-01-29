import React, { FunctionComponent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SidebarMain as SidebarMainComponent } from '../components/Sidebar/Main';
import { SidebarSubMenu as SidebarSubMenuComponent } from '../components/Sidebar/SubMenu';
import {
  AtSvg,
  BookmarkSvg,
  BriefcaseSvg,
  CalendarClearSvg,
  ChartColumnBarSvg,
  ChatBubblesSvg,
  CMLogoSvg,
  DashboardSvg,
  FileTrayFullSvg,
  FlashSvg,
  FunnelSvg,
  GridSvg,
  HammerWrenchSvg,
  HelpCircleSvg,
  HomeSvg,
  MenuSvg,
  NotificationSvg,
  PeopleCircleSvg,
  PersonCircleSvg,
  PlusSvg,
  SearchSvg,
  SettingsSvg,
  ShapesSvg,
  SocialSvg,
  AlbumsSvg,
  ReaderSvg,
  ChatBubbleSvg,
  ArrowCircleSvg,
} from '../icons';
import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  RowItem,
  RVColorProp,
  RVSizeProp,
  RVVariantProp,
  TextInput,
  Typography,
} from '..';

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
  const [isActionBarOpen, setIsActionBarOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <div
        style={{ display: 'flex', height: '100vh', position: 'sticky', top: 0 }}
      >
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
          <div
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <FileTrayFullSvg
              style={{ fontSize: '1.6rem', marginInlineEnd: '1rem' }}
            />
            <Typography type="H2" style={{ marginInlineEnd: '1rem' }}>
              Citations
            </Typography>
          </div>
          <div style={{ width: '100%', maxWidth: 490 }}>
            <TextInput
              label="Search in Researchers team"
              variant={RVVariantProp.outline}
              Icon={SearchSvg}
              fullWidth
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
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
            <Button rounded="half" fullCircle variant={RVVariantProp.white}>
              <ReaderSvg outline />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
