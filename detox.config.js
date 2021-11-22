const os = require('os');

const { logger } = require('@react-native-community/cli-tools');
const chalk = require('chalk');
const execa = require('execa');

/**
 * Reference:
 * https://github.com/react-native-community/cli/blob/2dbb1c8b9ae63aca4e48cd0922c61e250691f9d7/packages/platform-android/src/commands/runAndroid/tryLaunchEmulator.ts
 */
const emulatorCommand = process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/emulator/emulator` : 'emulator';
let targetEmulator = process.env.DETOX_TARGET_EMULATOR || '';

const getEmulators = () => {
  try {
    const emulatorsOutput = execa.sync(emulatorCommand, ['-list-avds']).stdout;
    return emulatorsOutput.split(os.EOL).filter((name) => name !== '');
  } catch {
    return [];
  }
};

if (!targetEmulator) {
  logger.info('Procurando emuladores...');

  const emulators = getEmulators();
  if (emulators.length === 0) {
    logger.error(chalk.dim('Nenhum emulador encontrado como saída de `emulator -list-avds`.'));
    logger.warn('Crie um emulador manualmente ou os testes irão falhar.');
  } else {
    targetEmulator = emulators[0];
    logger.info(`Emulador encontrado com sucesso. Detox irá utilizar o emulador \`${targetEmulator}\`.`);
  }
}

module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  skipLegacyWorkersInjection: true,
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && RN_SRC_EXT=detox.js ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && RN_SRC_EXT=detox.js ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: targetEmulator,
      },
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
  },
};
