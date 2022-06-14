import type { SVGProps } from 'react';
import styled from 'styled-components';
import {
  CV_GRAY_DARK,
  CV_RED,
  TCV_DEFAULT,
} from '../../../constant/CssVariables';

export type IDeleteConfirmMessage = {
  title?: string;
  // eslint-disable-next-line no-unused-vars
  Icon?: (props: SVGProps<SVGSVGElement> & { size: string }) => JSX.Element;
  question?: string;
  warning?: string;
};

/**
 *@component
 * @description - Delete Confirm Message component
 *
 * @param {object} props - DeleteConfirmMSG component props
 * @param {string} [props.title=""] - Message title
 * @param {()=>JSX.Element} props.Icon - JSX icon component
 * @param {string} [props.question=""] - Message question
 * @param {string} [props.warning=""] - Message warning
 *
 * @return {JSX.Element} The delete confirmation texts.
 */
function DeleteConfirmMSG({
  title = '',
  // eslint-disable-next-line react/jsx-no-useless-fragment
  Icon = () => <></>,
  question = '',
  warning = '',
}: IDeleteConfirmMessage): JSX.Element {
  return (
    <>
      <TextContainer bottomMargin="1.8rem">
        <Icon
          style={{ marginInlineEnd: '0.3rem', color: TCV_DEFAULT }}
          size="1.2rem"
        />
        {title}
      </TextContainer>
      <TextContainer color={CV_GRAY_DARK} bold bottomMargin="1rem">
        {question}
      </TextContainer>
      <TextContainer color={CV_RED}>{warning}</TextContainer>
    </>
  );
}

export default DeleteConfirmMSG;

const TextContainer = styled.div<{
  bottomMargin?: string;
  color?: string;
  bold?: boolean;
}>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: ${({ bottomMargin }) => bottomMargin || ''};
  color: ${({ color }) => color || 'unset'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;
