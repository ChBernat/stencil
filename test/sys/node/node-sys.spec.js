const nodeSys = require('../../../sys/node/index.js');


describe('test/sys/node', () => {
  let sys;

  beforeEach(() => {
    sys = new nodeSys.NodeSystemMain();
  });

  afterEach(() => {
    sys.destroy();
  });


  it('autoprefixCss', async () => {
    const input = `
      div {
        flex: 1;
      }
    `;

    let output = await sys.autoprefixCss(input);
    expect(output).toContain('-webkit-box-flex: 1');
    expect(output).toContain('-webkit-flex: 1');
    expect(output).toContain('-ms-flex: 1');
    expect(output).toContain('flex: 1');

    output = await sys.autoprefixCss(input, null);
    expect(output).toContain('-webkit-flex: 1');

    output = await sys.autoprefixCss(input, undefined);
    expect(output).toContain('-webkit-flex: 1');

    output = await sys.autoprefixCss(input, true);
    expect(output).toContain('-webkit-flex: 1');
  });

  it('gzipSize', async () => {
    let size = await sys.gzipSize('88888888888888888888888888888888888888888888888888');
    expect(size).toBe(24);

    size = await sys.gzipSize('888888888888888888');
    expect(size).toBe(23);
  });

});