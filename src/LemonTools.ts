/**
 * @fileoverview Extended version of the Discord.js Client
 * @since v3.0.0
 */

import { Client, Options } from "discord.js";
import config from "./config";
import Commands from "./managers/commands/Commands";
import Events from "./managers/events/Events";
import Logger from "./managers/logs/Logger";
import DevUtils from "./utils/dev/DevUtils";
import Cache from "./managers/cache/Cache";
import Resources from "./managers/logs/Resources";
import dotenv from "dotenv";

export default class LemonTools extends Client {
  // Managers
  public Logger = new Logger(this);
  public Commands = new Commands(this);
  public Events = new Events(this);
  public Cache = new Cache(this);
  public Resources = new Resources(this);

  constructor() {
    super({
      ...config.bot.options,
      intents: config.bot.intents,
      makeCache: Options.cacheWithLimits(config.bot.cache),
    });

    this.start();
  }

  async start() {
    // Load environment variables

    // Common environment variables
    dotenv.config({
      path: `${__dirname}/../.env.shared`,
    });
    if (DevUtils.isDev()) {
      // Development environment variables
      dotenv.config({
        path: `${__dirname}/../.env.dev`,
      });

      this.Logger.log(
        "warn",
        "LemonTools",
        `Developer mode enabled. Only the development server will receive updates.`
      );
    } else {
      // Production environment variables
      dotenv.config({
        path: `${__dirname}/../.env.prod`,
      });
    }

    
    await this.login(process.env.BOT_TOKEN);
    this.Logger.log(
      "info",
      "LemonTools",
      `Logged in as ${this.user?.tag ?? "an unknown user"}`
    );
  }
}
