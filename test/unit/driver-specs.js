// transpile:mocha

import AwtkDriver from '../..';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import B from 'bluebird';


chai.should();
chai.use(chaiAsPromised);

describe('driver.js', function () {
  describe('constructor', function () {
    it('calls BaseDriver constructor with opts', function () {
      let driver = new AwtkDriver({foo: 'bar'});
      driver.should.exist;
      driver.opts.foo.should.equal('bar');
    });
  });

  describe('createSession', function () {
    it('should set sessionId', async function () {
      let driver = new AwtkDriver({app: 'myapp'}, false);
      sinon.mock(driver).expects('startAppiumForAwtkSession')
          .once()
          .returns(B.resolve());
      await driver.createSession({cap: 'foo'});
      driver.sessionId.should.exist;
      driver.caps.cap.should.equal('foo');
    });
    it('should set sessionId (W3C)', async function () {
      let driver = new AwtkDriver({app: 'myapp'}, false);
      driver.shouldValidateCaps = false;
      sinon.mock(driver).expects('startAppiumForAwtkSession')
          .once()
          .returns(B.resolve());
      await driver.createSession(null, null, {
        alwaysMatch: {cap: 'foo'},
        firstMatch: [{}],
      });
      driver.sessionId.should.exist;
      driver.caps.cap.should.equal('foo');
    });
  });

  describe('proxying', function () {
    let driver;
    before(function () {
      driver = new AwtkDriver({}, false);
      driver.sessionId = 'abc';
    });
    describe('#proxyActive', function () {
      it('should exist', function () {
        driver.proxyActive.should.be.an.instanceof(Function);
      });
      it('should return true', function () {
        driver.proxyActive('abc').should.be.true;
      });
      it('should throw an error if session id is wrong', function () {
        (() => {driver.proxyActive('aaa');}).should.throw;
      });
    });

    describe('#canProxy', function () {
      it('should exist', function () {
        driver.canProxy.should.be.an.instanceof(Function);
      });
      it('should return true', function () {
        driver.canProxy('abc').should.be.true;
      });
      it('should throw an error if session id is wrong', function () {
        (() => {driver.canProxy('aaa'); }).should.throw;
      });
    });

    describe('#execute', function () {
      it('should raise when relaxed security is off', async function () {
        driver.relaxedSecurityEnabled = false;
        await driver.execute('script', 'args').should.eventually.be.rejected;
      });
    });
  });
});
