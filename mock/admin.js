function getTimeTable(req, res) {
  return res.json('api ne');
}

export default {
  // 'POST /api/application': (req, res) => {
  //   const {startTime, endTime } = req.body;
  //   res.send({

  //     startTime,
  //     endTime,
  //   });
  // },

  'GET  /api/admin/timetable': getTimeTable,

  // 'GET /api/application/auth/me': [{
  //     key: '1',
  //     fullname: 'My name !!!',
  //     email: 'myname213@gmail.com',
  //     phone: '0985423156',
  //     linkcv: 'https://www.linkedin.com/in/hoangtran-designer/',
  //     applydate: '2020-02-15T17:03:16.509Z',
  // }, ],
};
