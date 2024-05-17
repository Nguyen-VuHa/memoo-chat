
export const HeaderRoleList = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      field: "ID",
      sorter: (a, b) => parseInt(a.ID) - parseInt(b.ID),
    },
    {
      title: "Role Name",
      dataIndex: "Name",
      key: "Name",
      field: "Name",
      sorter: (a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()),
    },
    {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
        field: "Status",
        sorter: (a, b) => a.Status.toLowerCase().localeCompare(b.Status.toLowerCase()),
    },
    {
        title: "Note",
        dataIndex: "Note",
        key: "Note",
        field: "Note",
        sorter: (a, b) => a.Note.toLowerCase().localeCompare(b.Note.toLowerCase()),
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      field: "options",
    },
]