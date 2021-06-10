Appium Awtk Driver
===================

Appium Awtk Driver is a test automation tool for [Awtk apps](https://github.com/zlgopen/awtk)

This project is base on [appium-mac-driver](https://github.com/appium/appium-mac-driver) 

## Installation

```
npm install appium appium-awtk-driver
```

## Usage

### AWTK App

[集成自动测试引擎](https://github.com/zlgopen/awtk-ui-automation/blob/master/docs/how_to_integrate_awtktk_ui_automation.md)

### Test script

#### javascript

Preparation:

```
npm install wd webdriverio
```

Example:

```javascript
const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "awtk",
    a4aPort: 8000
  }
};

async function main () {
  const client = await wdio.remote(opts);

  const field = await client.$("~edit");

  await field.clear();
  assert.strictEqual(await field.getText(), "");

  await field.addValue("123456");
  assert.strictEqual(await field.getText(), "123456");

  await client.deleteSession();
}

main();
```

#### python

Preparation:

```
pip install pytest Appium-Python-Client
```

Example:

```python
import pytest
from appium import webdriver
import os
import time

caps = {
    "platformName": "awtk",
    "a4aPort": 8000
}

app = "../awtk-ui-automation/bin/demo"

class Testcase1():
    driver = None

    def setup_class(self):
        os.system(app + " >/dev/null &")
        time.sleep(0.5)
        self.driver = webdriver.Remote("http://localhost:4723/wd/hub", caps)
        assert self.driver is not None

    def teardown_class(self):
        self.driver.quit()

    def test_set_edit(self):
        edit = self.driver.find_element_by_id("edit")
        edit.clear()
        assert edit.text == ""
        text = "123456"
        edit.send_keys(text)
        assert edit.text == text

if __name__ == "__main__":
    pytest.main(['-s', '-v', 'test_main.py'])
```
