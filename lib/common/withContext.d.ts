import React from 'react';
export default function <CP>(Context: React.Context<CP>, shouldRender?: (context: CP) => boolean): <P extends CP>(WrappedComponent: React.ComponentClass<P, any>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<React.PropsWithChildren<P>, Exclude<"children", keyof CP> | Exclude<keyof P, keyof CP>>> & React.RefAttributes<React.Component<P, any, any>>>;
