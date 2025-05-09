// animation.ts
export type Fn = () => void;

export function animate(options?: {
  speed?: number;
}) {
  let { speed: _speed = 0.5 } = options || {};

  let _callback: Fn | undefined;
  let _isPlay = false;
  let _timestamp = 0;
  let _ref: number | undefined;

  function getTimestamp() {
    return _timestamp;
  }

  function setSpeed(speed: number) {
    _speed = speed;
  }

  function setCallback(callback: Fn) {
    _callback = callback;
  }

  function toggle(play?: boolean) {
    const isPlay = isDefined(play) ? play : !_isPlay;
    if (isPlay === _isPlay) {
      return;
    }
    if (isPlay) {
      _play();
    } else {
      _pause();
    }
    _isPlay = isPlay;
  }

  function _play() {
    if (!_callback) {
      return;
    }
    _timestamp += _speed;
    _callback();
    _ref = requestAnimationFrame(_play);
  }

  function _pause() {
    if (_ref) {
      cancelAnimationFrame(_ref);
      _ref = undefined;
    }
  }

  function _reset() {
    _timestamp = 0;
    _pause();
    _callback?.();
  }

  return {
    getTimestamp,

    setSpeed,
    setCallback,

    toggle,
    play: _play,
    pause: _pause,
    reset: _reset,
  };
}
