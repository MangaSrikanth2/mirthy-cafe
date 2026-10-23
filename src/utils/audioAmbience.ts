// Web Audio API Synthesizer for Warm Ambient French Café Atmosphere
let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
let isPlaying = false

export function toggleAudioAmbience(onStateChange?: (playing: boolean) => void): boolean {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      audioCtx = new AudioContextClass()

      // Master Gain
      masterGain = audioCtx.createGain()
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime)
      masterGain.connect(audioCtx.destination)

      // Warm acoustic harmonics
      const freqs = [130.81, 164.81, 196.00, 261.63] // C3, E3, G3, C4 warm major chord
      freqs.forEach((freq, idx) => {
        if (!audioCtx || !masterGain) return
        const osc = audioCtx.createOscillator()
        const oscGain = audioCtx.createGain()
        const filter = audioCtx.createBiquadFilter()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

        // Low-pass filter for velvety softness
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(450, audioCtx.currentTime)

        // Subtle gentle detune modulation
        oscGain.gain.setValueAtTime(0.025 / (idx + 1), audioCtx.currentTime)

        osc.connect(filter)
        filter.connect(oscGain)
        oscGain.connect(masterGain)
        osc.start()
      })
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    if (!isPlaying) {
      masterGain?.gain.setTargetAtTime(0.2, audioCtx.currentTime, 0.8)
      isPlaying = true
    } else {
      masterGain?.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.5)
      isPlaying = false
    }

    if (onStateChange) {
      onStateChange(isPlaying)
    }

    return isPlaying
  } catch (e) {
    console.warn('Audio Ambience unavailable:', e)
    return false
  }
}
