
export const HeaderMenuList = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      field: "ID",
      sorter: (a, b) => parseInt(a.ID) - parseInt(b.ID),
    },
    {
      title: "Menu Name",
      dataIndex: "Name",
      key: "Name",
      field: "Name",
      sorter: (a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()),
    },
    {
      title: "Path",
      dataIndex: "Path",
      key: "Path",
      field: "Path",
      sorter: (a, b) => a.Path.toLowerCase().localeCompare(b.Path.toLowerCase()),
    },
    {
      title: "Icon",
      dataIndex: "Icon",
      key: "Icon",
      field: "Icon",
      sorter: (a, b) => a.Icon.toLowerCase().localeCompare(b.Icon.toLowerCase()),
    },
    {
      title: "Component",
      dataIndex: "Component",
      key: "Component",
      field: "Component",
      sorter: (a, b) => a.Component.toLowerCase().localeCompare(b.Component.toLowerCase()),
    },
    {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
        field: "Status",
        sorter: (a, b) => a.Status.toLowerCase().localeCompare(b.Status.toLowerCase()),
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      field: "options",
    },
]