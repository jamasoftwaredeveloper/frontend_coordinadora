import React from 'react';

/**
 * Table Component
 * @param {boolean} striped - If true, applies stripe effect on rows
 * @param {React.ReactNode} children - Expects Table.Head and Table.Body as children
 */
const Table = ({ striped = false, children }) => {
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
Table.Body = ({ children, striped = false }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {React.Children.map(children, (child, idx) =>
      React.cloneElement(child, {
        className: `${child.props.className || ''} ${
          striped && idx % 2 === 1 ? 'bg-gray-50' : ''
        }`,
      })
    )}
  </tbody>
);

export default Table;

