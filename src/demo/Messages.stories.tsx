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
  ChatBubbleSvg,
} from '../icons';
import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  ChatBubble,
  RowItem,
  RVColorProp,
  RVSizeProp,
  RVVariantProp,
  TextInput,
  Typography,
} from '..';
import { Breadcrumb } from '../components/Breadcrumb';
import { Separator } from '../components/Separator';

export default {
  title: 'Demo/Messages',
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

export const Messages: ComponentStory<FunctionComponent> = ({ ...args }) => {
  const [isActionBarOpen, setIsActionBarOpen] = useState<boolean>(false);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState<boolean>(false);
  const toggleBookmark = () => {
    setIsBookmarkChecked((prev) => !prev);
  };
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
            <Breadcrumb
              // color={RVColorProp.grayDark}
              Icon={ChatBubbleSvg}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              color={RVColorProp.inherit}
              routeLinks={[{ label: 'Citations', path: '' }]}
            />
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
            <Avatar
              src="https://i.pravatar.cc/300"
              fullCircle
              variant={RVVariantProp.white}
              size={RVSizeProp.small}
            />
            <Typography
              type="H4"
              style={{ whiteSpace: 'nowrap', marginInlineStart: '1rem' }}
            >
              Alonzo Gerhold
            </Typography>
          </div>
        </div>

        <Separator size={RVSizeProp.small} variant={RVVariantProp.white} nowrap>
          Sunday, 17 July 2022
        </Separator>
        <ChatBubble
          bubbleType="receiver"
          color={RVColorProp.crayola}
          variant={RVVariantProp.white}
          additionalInfo="12:32"
        >
          Asperiores ut est itaque mollitia quia fugit nihil.
        </ChatBubble>
        <ChatBubble
          bubbleType="sender"
          color={RVColorProp.cgBlue}
          variant={RVVariantProp.primary}
          additionalInfo="12:32"
        >
          Asperiores ut est itaque mollitia quia fugit nihil.
        </ChatBubble>

        <Separator size={RVSizeProp.small} variant={RVVariantProp.white} nowrap>
          Sunday, 17 July 2022
        </Separator>

        <ChatBubble
          bubbleType="receiver"
          color={RVColorProp.crayola}
          variant={RVVariantProp.white}
          additionalInfo="12:32"
        >
          Asperiores ut est itaque mollitia quia fugit nihil.
        </ChatBubble>
        <ChatBubble
          bubbleType="sender"
          color={RVColorProp.cgBlue}
          variant={RVVariantProp.primary}
          additionalInfo="12:32"
        >
          Asperiores ut est itaque mollitia quia fugit nihil.
        </ChatBubble>

        <Separator size={RVSizeProp.small} variant={RVVariantProp.white} nowrap>
          Sunday, 17 July 2022
        </Separator>

        <ChatBubble
          bubbleType="receiver"
          color={RVColorProp.crayola}
          variant={RVVariantProp.white}
          additionalInfo="12:32"
          style={{ maxWidth: '450px' }}
        >
          Asperiores ut est itaque mollitia quia fugit nihil. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Suscipit ratione eligendi
          facere iusto minus totam, eius, sequi rem nesciunt culpa expedita
          minima reiciendis. Sapiente cumque consectetur, similique accusamus
          adipisci nisi.
        </ChatBubble>
        <ChatBubble
          bubbleType="sender"
          color={RVColorProp.cgBlue}
          variant={RVVariantProp.primary}
          additionalInfo="12:32"
        >
          Asperiores ut est itaque mollitia quia fugit nihil.
        </ChatBubble>
      </div>
    </div>
  );
};
