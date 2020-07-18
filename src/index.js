const path = require('path');

/**
 * Get Jest configuration.
 *
 * @param {string} testing - Testing source code or built code?
 * @param {Object} settings - Extendable settings
 * @returns {Object} Jest settings
 */
module.exports = (testing = 'source', settings) => {
    const isTestingBuild = testing === 'bundle' || testing === 'build';

    process.env.JEST_JUNIT_OUTPUT_DIR = './tests_results/unit/';

    return {
        transform: { '.*': 'babel-jest' },
        setupFilesAfterEnv: [path.resolve(__dirname, 'setup.js')],
        collectCoverage: !isTestingBuild,
        coverageDirectory: 'tests_results/coverage',
        reporters: ['default', 'jest-junit'],
        collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
        coverageReporters: ['text', 'cobertura', 'lcov'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
        moduleDirectories: ['node_modules', 'src'],
        testMatch: ['<rootDir>/tests/**/*.test.*'],
        transformIgnorePatterns: ['<rootDir>/dist','<rootDir>/node_modules'],
        moduleNameMapper: {
            '\\.(scss|css|less)$': 'identity-obj-proxy',
            ...(isTestingBuild
                ? {
                      '(.*)src(.*)': '$1dist$2',
                  }
                : {}),
        },
        testURL: 'http://localhost/',
        ...settings,
    };
};
