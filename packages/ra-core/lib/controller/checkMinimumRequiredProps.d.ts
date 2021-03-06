import React from 'react';
declare const checkMinimumRequiredProps: (displayName: string, requiredProps: string[]) => (WrappedComponent: React.ComponentType<{}>) => (props: any) => JSX.Element;
export default checkMinimumRequiredProps;
export declare const useCheckMinimumRequiredProps: (displayName: string, requiredProps: string[], props: any) => void;
