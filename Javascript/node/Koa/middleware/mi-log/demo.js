/**
 * log4js日志 使用demo
 * @type {{ConsoleAppender: ConsoleAppender, isConfigured(): boolean, Configuration: Configuration, TCPAppender: TCPAppender, CallStack: CallStack, Config: any, ColoredLayout: ColoredLayout, recording(): Recording, Token: ((logEvent: LoggingEvent) => string) | string, Logger: Logger, SyncfileAppender: SyncfileAppender, LoggingEvent: LoggingEvent, StandardErrorAppender: StandardErrorAppender, Format: string | ((req: any, res: any, formatter: (str: string) => string) => string), StandardOutputAppender: StandardOutputAppender, AppenderFunction: (loggingEvent: LoggingEvent) => void, LayoutFunction: (loggingEvent: LoggingEvent) => string, Appenders: Appenders, MessagePassThroughLayout: MessagePassThroughLayout, RecordingAppender: RecordingAppender, AppenderModule: AppenderModule, LogLevelFilterAppender: LogLevelFilterAppender, Appender: ConsoleAppender | FileAppender | TCPAppender | DateFileAppender | CustomAppender | CategoryFilterAppender | SyncfileAppender | MultiFileAppender | NoLogFilterAppender | StandardErrorAppender | StandardOutputAppender | MultiprocessAppender | RecordingAppender | LogLevelFilterAppender, FileAppender: FileAppender, Log4js: Log4js, DateFileAppender: DateFileAppender, CustomAppender: CustomAppender, PatternLayout: PatternLayout, getLogger(category?: string): Logger, CategoryFilterAppender: CategoryFilterAppender, configure: {(filename: string): Log4js, (config: Configuration): Log4js}, MultiFileAppender: MultiFileAppender, LayoutsParam: LayoutsParam, NoLogFilterAppender: NoLogFilterAppender, PatternToken: PatternToken, connectLogger(logger: Logger, options: {format?: Format, level?: string, nolog?: any, statusRules?: any[], context?: boolean}): any, BasicLayout: BasicLayout, Layout: BasicLayout | ColoredLayout | MessagePassThroughLayout | DummyLayout | PatternLayout | CustomLayout, CustomLayout: CustomLayout, DummyLayout: DummyLayout, Levels: Levels, addLayout(name: string, config: (a: any) => (logEvent: LoggingEvent) => any): void, MultiprocessAppender: MultiprocessAppender, Level: Level, Recording: Recording, shutdown(cb?: (error?: Error) => void): void, levels: Levels}}
 */
const log4js = require('log4js');
log4js.configure({
    /**
     * 指定要记录的日志分类 cheese
     * 展示方式为文件类型 file
     * 日志输出的文件名 cheese.log
     */
    appenders: {cheese: {type: 'file', filename: 'cheese.log'}},
    /**
     * 指定日志的默认配置项
     * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
     * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
     */
    categories: {default: {appenders: ['cheese'], level: 'error'}}
});

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');