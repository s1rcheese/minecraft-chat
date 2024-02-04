module.exports = bot => {
    bot.antiwater = {}
  
    bot.antiwater.start = () => {
        if(bot.entity.isInWater) {bot.jump}
        if(bot.entity.isInLava) {bot.jump}
    }
  }