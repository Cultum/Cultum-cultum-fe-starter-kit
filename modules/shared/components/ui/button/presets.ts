import { css } from 'styled-components';

export const buttonPresets = {
  details: css`
    padding: 5px 10px;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.green200};
    color: #fff;
    outline: none;
    transition: background-color 0.2s linear;
    cursor: pointer;

    &:hover {
      background-color: rgba(135, 204, 67, 0.8);
    }
  `,

  default: css`
    padding: 10px 20px;
    font-size: 18px;
    background-color: ${({ theme }) => theme.colors.gray600};
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.yellow400};
    color: #fff;
    outline: none;
    transition: background-color 0.2s linear;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.yellow400};
    }

    :active {
      opacity: 0.9;
    }
  `,

  close: css`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    font-size: 24px;
    width: 40px;
    height: 40px;
    color: #fff;
    outline: none;
    background-color: transparent;
    border-radius: 3px;
    transition: background-color 0.2s linear;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.green200};

    &:hover {
      background-color: rgba(135, 204, 67, 0.8);
    }
  `
};

export type ButtonPresets = keyof typeof buttonPresets;
