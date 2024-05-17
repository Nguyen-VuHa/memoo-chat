
export const HeaderUserList = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      field: "ID",
      sorter: (a, b) => parseInt(a.ID) - parseInt(b.ID),
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
      field: "FullName",
      sorter: (a, b) => a.FullName.toLowerCase().localeCompare(b.FullName.toLowerCase()),
    },
    {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        field: "Email",
        sorter: (a, b) => a.Email.toLowerCase().localeCompare(b.Email.toLowerCase()),
    },
    {
        title: "RoleName",
        dataIndex: "RoleName",
        key: "RoleName",
        field: "RoleName",
        sorter: (a, b) => a.RoleName.toLowerCase().localeCompare(b.RoleName.toLowerCase()),
    },
    {
        title: "Status",
        dataIndex: "Active",
        key: "Active",
        field: "Active",
        sorter: (a, b) => a.Active.toLowerCase().localeCompare(b.Active.toLowerCase()),
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      field: "options",
    },
]