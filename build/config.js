export const defaultConfig = {
    python: {
        version: '3.x',
        packages: {
            'numpy': '*',
            'pandas': '*',
            'matplotlib': '*',
            'scikit-learn': '*'
        }
    },
    execution: {
        maxMemoryMb: 512,
        timeoutMs: 30000,
        maxConcurrent: 5
    },
    logging: {
        level: 'info',
        format: 'json'
    }
};
export function loadConfig() {
    const config = { ...defaultConfig };
    // Override with environment variables if present
    if (process.env.PYTHON_VERSION) {
        config.python.version = process.env.PYTHON_VERSION;
    }
    if (process.env.PREINSTALLED_PACKAGES) {
        const packages = process.env.PREINSTALLED_PACKAGES.split(' ').filter(Boolean);
        config.python.packages = packages.reduce((acc, pkg) => {
            acc[pkg] = '*';
            return acc;
        }, {});
    }
    if (process.env.MAX_MEMORY_MB) {
        config.execution.maxMemoryMb = parseInt(process.env.MAX_MEMORY_MB, 10);
    }
    if (process.env.EXECUTION_TIMEOUT_MS) {
        config.execution.timeoutMs = parseInt(process.env.EXECUTION_TIMEOUT_MS, 10);
    }
    if (process.env.MAX_CONCURRENT_EXECUTIONS) {
        config.execution.maxConcurrent = parseInt(process.env.MAX_CONCURRENT_EXECUTIONS, 10);
    }
    if (process.env.LOG_LEVEL) {
        config.logging.level = process.env.LOG_LEVEL;
    }
    if (process.env.LOG_FORMAT) {
        config.logging.format = process.env.LOG_FORMAT;
    }
    return config;
}
