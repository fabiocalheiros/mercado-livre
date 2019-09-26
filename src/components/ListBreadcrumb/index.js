import React from 'react';

import { Breadcrumb } from 'antd';

export default function ListBreadcrumb(props) {
  const { data } = props;

  return (
    <Breadcrumb>
      {data.map(category => (
        <Breadcrumb.Item key={category.id} href={category.id}>
          {category.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
