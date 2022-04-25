import Manager from "../../classes/base/managers/Manager";
import Bot from "../../classes/Bot";

const listenTo = ["SIGINT", "SIGUSR1", "SIGUSR2"] as const;

export default class PreCloseCleanupManager extends Manager {
  constructor(bot: Bot) {
    super("PreCloseCleanupManager", bot);

    listenTo.forEach((event) => {
      this.bot.logger.verbose(
        `PreCloseCleanupManager: Listening to ${event} to trigger pre-close cleanup`
      );
      process.on(event, () => this.exit(event));
    });
  }

  async exit(event: typeof listenTo[number]) {
    const _start = Date.now();
    this.bot.logger.info(
      `PreCloseCleanupManager: Detected code exit. Cleaning up...`
    );
    this.bot.logger.verbose(
      `PreCloseCleanupManager: Shutdown initiated from ${event}`
    );
    this.bot.logger.verbose(
      `PreCloseCleanupManager: Shutdown begun at ${new Date(
        _start
      ).toISOString()}`
    );

    process.exit(0);
  }
}
