const chalk = require('chalk')
const log = require('gulplog')
//const prettyTime = require('pretty-time')
const ua = require('universal-analytics')
const visitor = ua('UA-73382138-1', 'AngularSeed-2', { strictCidFormat: false }).debug()

class Timer {

  private timers = {}

  constructor() {
  }

  public time(label, callback) {
    if (this.timers[label]) {
      throw new Error(`Time "${label}" is already defined.`)
    }
    this.timers[label] = process.hrtime()

    recordEvent("start", "Event", "Build", null, "Test", callback)
    callback()
  }

  public endTime(label, callback) {
    if (!this.timers[label]) {
      throw new Error(`Time "${label}" is not defined.`)
    }

   // var time = prettyTime(process.hrtime(this.timers[label]))
    var time = process.hrtime(this.timers[label])

    log.info(
      'Finished', '\'' + chalk.magenta(label) + '\'',
      'after', chalk.bold.red(time)
    );
   // analytics.timing("Task:Serve", "Time to execute event:", time).send()
   recordEvent("success", "Event", "Build", time, "Test", callback)

    delete this.timers[label]
    callback()
  }

}

function recordEvent(eventType, actionCategory, actionName, duration, label, callback) {
  // if universal-analytics is not yet installed, don't bother doing anything (e.g. when tracking initial npm install)
  // build-analytics will however store the starting timestamp, so at least we can record the success/error event with duration
  if (!ua) return;

  if (duration) {
    duration = Math.round(duration);
  }

  switch (eventType) {
    case 'start':
      visitor.
        event(actionCategory, actionName + ' (start)', label, null).
        send();
        callback()
      break;
    case 'success':
      visitor.
        event(actionCategory, actionName, label, duration).
        timing(actionCategory, actionName, duration, label).
        send();
        callback()
      break;
    case 'error':
      visitor.
        event(actionCategory, actionName + ' (errored)', label, duration).
        timing(actionCategory, actionName, duration, label).
        send();
        callback()
      break;
    default:
      throw new Error(`unknown event type "${eventType}"`);
  }
}


exports.timer = new Timer()