export const eventData = [
  {
    id: 1,
    title: 'This is my project title. This is my project title',
    description: 'This is my fake description. This is my fake description. This is my fake description. This is my fake description. This is my fake description. This is my fake description',
    dateId: '2020-4-1',
    status: 'At Risk',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 1, 0, 0, 0, 0),
    salesman: {
      name: 'Tex Terango'
    },
    customerList: [
      {
        account: 21212,
        name: 'Britain Electric',
        salesman: 'Skip Peters',
        status: 'Lost'
      },
      {
        account: 4444,
        name: 'Trio Electric',
        salesman: 'Skip Peters',
        status: 'Lost'
      },
      {
        account: 101843,
        name: 'Advanced Electrical Solutions Inc.',
        salesman: 'Skip Peters',
        status: 'Pending'
      }
    ],
    size: 'Medium'
  },
  {
    id: 2,
    title: 'test2',
    description: 'This is my fake description',
    dateId: '2020-4-1',
    status: 'On Track',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 1, 0, 0, 0, 0),
    salesman: {
      name: 'Place Holder'
    },
    customerList: [
      {
        account: 21212,
        name: 'Place Holder Customer Name 1'
      }
    ],
    size: 'Medium'
  },
  {
    id: 3,
    title: 'test3',
    description: 'This is my fake description',
    dateId: '2020-4-1',
    status: 'On Track',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 1, 0, 0, 0, 0),
    salesman: {
      name: 'Place Holder'
    },
    customerList: [
      {
        account: 21212,
        name: 'Place Holder Customer Name 1'
      },
      {
        account: 4444,
        name: 'Place Holder Customer Name 4'
      }
    ],
    size: 'Medium'
  },
  {
    id: 4,
    title: 'test4',
    description: 'This is my fake description',
    dateId: '2020-4-17',
    status: 'On Track',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 17, 0, 0, 0, 0),
    salesman: {
      name: 'Place Holder'
    },
    customerList: [
      {
        account: 21212,
        name: 'Place Holder Customer Name 1'
      },
      {
        account: 4444,
        name: 'Place Holder Customer Name 4'
      }
    ],
    size: 'Medium'
  },
  {
    id: 5,
    title: 'test5',
    description: 'This is my fake description',
    dateId: '2020-4-1',
    status: 'On Track',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 1, 0, 0, 0, 0),
    salesman: {
      name: 'Place Holder'
    },
    customerList: [
      {
        account: 21212,
        name: 'Place Holder Customer Name 1'
      },
      {
        account: 4444,
        name: 'Place Holder Customer Name 4'
      }
    ],
    size: 'Medium'
  },
  {
    id: 6,
    title: 'test6',
    description: 'This is my fake description',
    dateId: '2020-4-7',
    status: 'On Track',
    dateAdded: new Date(),
    dateDue: new Date(2020, 4, 7, 0, 0, 0, 0),
    salesman: {
      name: 'Place Holder'
    },
    customerList: [
      {
        account: 21212,
        name: 'Place Holder Customer Name 1'
      },
      {
        account: 4444,
        name: 'Place Holder Customer Name 4'
      }
    ],
    size: 'Medium'
  }
]

export const comments = [
  {
    id: 1,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'I am not sure if we should even be quoting this project. I am not sure if we should even be quoting this project. I am not sure if we should even be quoting this project. I am not sure if we should even be quoting this project. I am not sure if we should even be quoting this project. ',
    user: {
      name: 'Jon Busch'
    },
    replyTo: null,
    edited: false
  },
  {
    id: 2,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'Why do you say that??',
    user: {
      name: 'Chris Cook'
    },
    replyTo: 1,
    edited: false
  },
  {
    id: 3,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'Because the workload is huge but the profit will be almost nothing.',
    user: {
      name: 'Jon Busch'
    },
    replyTo: 1,
    edited: true
  },
  {
    id: 4,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'Maybe we just quote a part of it.',
    user: {
      name: 'Jon Busch'
    },
    replyTo: null,
    edited: false
  },
  {
    id: 5,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'Which part?',
    user: {
      name: 'Chris Cook'
    },
    replyTo: 4,
    edited: false
  },
  {
    id: 6,
    eventId: 1,
    dateCreated: new Date(2020, 4, 7, 0, 0, 0, 0),
    message: 'The easy part haha',
    user: {
      name: 'Jon Busch'
    },
    replyTo: 4,
    edited: true
  }
]
