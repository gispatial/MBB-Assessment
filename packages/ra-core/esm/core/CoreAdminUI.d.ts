import { FunctionComponent, ComponentType } from 'react';
import { TitleComponent, LoginComponent, LayoutComponent, AdminChildren, CatchAllComponent, CustomRoutes, DashboardComponent } from '../types';
export declare type ChildrenFunction = () => ComponentType[];
export interface CoreAdminUIProps {
    catchAll?: CatchAllComponent;
    children?: AdminChildren;
    customRoutes?: CustomRoutes;
    dashboard?: DashboardComponent;
    layout?: LayoutComponent;
    loading?: ComponentType;
    loginPage?: LoginComponent | boolean;
    logout?: ComponentType;
    menu?: ComponentType;
    theme?: object;
    title?: TitleComponent;
}
declare const CoreAdminUI: FunctionComponent<CoreAdminUIProps>;
export default CoreAdminUI;
