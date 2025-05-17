import React from 'react';

/**
 * Table Component
 * @param {boolean} striped - If true, applies stripe effect on rows
 * @param {React.ReactNode} children - Expects Table.Head and Table.Body as children
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Table = ({ striped = false, children }: { striped?: boolean; children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
};

/**
 * Table Head subcomponent
 */
Table.Head = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50">
    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </tr>
  </thead>
);

/**
 * Table Body subcomponent
 */
Table.Body = ({ children, striped = false }: { children: React.ReactNode; striped?: boolean }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {React.Children.map(children, (child, idx) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLTableRowElement>>, {
            className: `${(child.props as React.HTMLAttributes<HTMLTableRowElement>).className || ''} ${
              striped && idx % 2 === 1 ? 'bg-gray-50' : ''
            }`,
          })
        : child
    )}
  </tbody>
);

export default Table;

