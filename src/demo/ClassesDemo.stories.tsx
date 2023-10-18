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
import { Breadcrumb } from '../components/Breadcrumb';
import { withAvatarDemo } from '../storybookComponents';

const AvatarComponent = withAvatarDemo(Avatar, 'src');

export default {
  title: 'Demo/Classes',
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

export const Classes: ComponentStory<FunctionComponent> = ({ ...args }) => {
  const [isActionBarOpen, setIsActionBarOpen] = useState<boolean>(false);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState<boolean>(false);
  const toggleBookmark = () => {
    setIsBookmarkChecked((prev) => !prev);
  };
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
              // color={RVColorProp.grayDark}
              Icon={FileTrayFullSvg}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              routeLinks={[{ label: 'Citations', path: '' }]}
            />

            <ButtonGroup>
              <Button size={RVSizeProp.small}>
                <PlusSvg />
                New item
              </Button>
              <Button size={RVSizeProp.small}>
                <FlashSvg />
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ width: '100%', maxWidth: 490 }}>
            <TextInput
              label="Search in Researchers team"
              variant={RVVariantProp.outline}
              Icon={SearchSvg}
              color={RVColorProp.distant}
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
          }}
        >
          <div
            style={{
              width: 490,
              marginBlock: '40px 23px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextInput
              label="Find in item names and keywords"
              variant={RVVariantProp.outline}
              Icon={SearchSvg}
              color={RVColorProp.distant}
              fullWidth
            />
            <Typography type="caption" style={{ whiteSpace: 'nowrap', marginInlineStart: '1rem' }}>
              1129 items
            </Typography>
          </div>
          <div
            style={{
              marginBlock: '40px 23px',
              display: 'flex',
              alignItems: 'center',
              columnGap: '1rem',
            }}
          >
            <Button rounded="half" variant={RVVariantProp.white}>
              <FunnelSvg />
              Advanced
            </Button>
            <Button rounded="half" fullCircle variant={RVVariantProp.white}>
              <AtSvg outline />
            </Button>
            <Button
              active={!isBookmarkChecked}
              rounded="half"
              fullCircle
              variant={RVVariantProp.white}
              onClick={toggleBookmark}
            >
              <BookmarkSvg outline={isBookmarkChecked} />
            </Button>
            <Button rounded="half" fullCircle variant={RVVariantProp.white}>
              <CalendarClearSvg outline />
            </Button>
            <Button rounded="half" fullCircle variant={RVVariantProp.white}>
              <PersonCircleSvg outline />
            </Button>
          </div>
        </div>
        {new Array(20).fill(0).map(() => {
          return (
            <RowItem
              ActionsComponent={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '1rem',
                  }}
                >
                  <Button rounded="half" fullCircle variant={RVVariantProp.white} badge>
                    <BookmarkSvg outline />
                  </Button>
                  <Button
                    noWrap
                    badge
                    rounded="half"
                    color={RVColorProp.distant}
                    variant={RVVariantProp.white}
                  >
                    <BookmarkSvg outline /> 29 may
                  </Button>
                  <AvatarGroup>
                    {new Array(3).fill(0).map((_, idx) => {
                      const AvatarComponent = withAvatarDemo(Avatar, 'src', idx);
                      return (
                        <AvatarComponent
                          rounded="full"
                          size={RVSizeProp.small}
                          variant={RVVariantProp.white}
                          stacked
                          src="/demo-avatar"
                        />
                      );
                    })}
                  </AvatarGroup>
                </div>
              }
            >
              <GridSvg /> Find faculty mentor
            </RowItem>
          );
        })}
      </div>
    </div>
  );
};
