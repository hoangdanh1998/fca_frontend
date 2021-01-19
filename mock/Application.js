function createApplicationManagement(req, res) {
  return res.json('api ne');
}
function getTimeTable(req, res) {
  return res.json('api ne');
}

export default {
  'POST /api/application': (req, res) => {
    const { date, startTime, place, pic, capacity, length } = req.body;
    res.send({
      date,
      startTime,
      place,
      pic,
      capacity,
      length,
    });
  },
  'POST /api/schedule': (req, res) => {
    const { startTime, endTime } = req.body;
    res.send({
      startTime,
      endTime,
    });
  },

  'GET  /api/application': createApplicationManagement,
  'GET  /api/schedule': getTimeTable,

  // 'GET /api/application/auth/me': [{
  //     key: '1',
  //     fullname: 'My name !!!',
  //     email: 'myname213@gmail.com',
  //     phone: '0985423156',
  //     linkcv: 'https://www.linkedin.com/in/hoangtran-designer/',
  //     applydate: '2020-02-15T17:03:16.509Z',
  // }, ],
};
