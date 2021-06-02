// transpile:mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AppiumForAwtk from '../../lib/appium-for-awtk';
import { withSandbox } from 'appium-test-support';
import B from 'bluebird';


chai.should();
chai.use(chaiAsPromised);

function buildAppiumForAwtkOpts () {
  return {
    app: 'foo',
    platformName: 'Awtk',
    host: 'localhost',
    port: 4623
  };
}

describe('AppiumForAwtk', function () {
  describe('#startSession', withSandbox({}, (S) => {
    let appium4MacDriver = new AppiumForAwtk(buildAppiumForAwtkOpts());

    afterEach(function () {
      S.verify();
    });

    it('should start a session', async function () {
      let caps = {foo: 'bar'};
      S.mocks.jwproxy = S.sandbox.mock(appium4MacDriver.jwproxy);
      S.mocks.jwproxy.expects('command').once()
        .withExactArgs('/session', 'POST', {desiredCapabilities: caps})
        .returns(B.resolve());
      await appium4MacDriver.startSession(caps);
    });
  }));
});
