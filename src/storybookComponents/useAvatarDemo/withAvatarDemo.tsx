import { ComponentProps, VoidFunctionComponent } from 'react';
import * as avatars from './assets/images';

const withAvatarDemo =
  <P extends {}>(Component: VoidFunctionComponent<P>, srcPropKey: string, avatarItem: number = 1) =>
  (props: ComponentProps<typeof Component>) => {
    const demoProps = {
      ...props,
      [srcPropKey]: Object.values(avatars)[avatarItem % Object.values(avatars).length],
    };

    return <Component {...demoProps} />;
  };

export default withAvatarDemo;
