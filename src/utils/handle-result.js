class HandleRes {
  success(ctx, msg, code = 200) {
    ctx.status = code
    ctx.body = {
      msg,
      code
    }
  }
  error(ctx, msg, code = 400) {
    ctx.status = code
    ctx.body = {
      msg,
      code
    }
  }
}

module.exports = new HandleRes()
