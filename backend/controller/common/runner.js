function runner(tasks, payload, next) {
  const last = tasks.length - 1;

  (function run(pos) {
    tasks[pos].call(payload, (err) => {
      if (err) return next(err);
      else if (pos === last) return next(err);

      process.nextTick(function () {
        run(++pos);
      });
    });
  })(0);
}

module.exports = runner;
