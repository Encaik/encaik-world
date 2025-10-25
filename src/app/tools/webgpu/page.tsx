'use client';
import { useEffect, useRef, useState } from 'react';
import useWebGPU from './useWebgpu';

export default function Webgpu() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  
  // 在useEffect中设置canvas，避免在渲染时访问ref
  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, []);
  
  const { adapter, device, context, format } = useWebGPU(canvas);

  useEffect(() => {
    if (!canvas || !context || !adapter || !device) return;
    
    const vertexCode = `struct VertexOutput {
      @builtin(position) pos : vec4<f32>
  };

  @vertex
  fn main(
    @builtin(vertex_index) VertexIndex : u32
  ) -> VertexOutput {
    var pos = array<vec2f, 3>(
      vec2(0.0, 0.5),
      vec2(-0.5, -0.5),
      vec2(0.5, -0.5)
    );
    var output : VertexOutput;
    output.pos = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    return output;
  }
  `;

    const fragmentCode = `struct VertexOutput {
      @builtin(position) pos: vec4<f32>,
  };

  @fragment
  fn main(in: VertexOutput) -> @location(0) vec4f {
    return vec4(abs(in.pos.xy), 0.0, 1.0);
  }`;

    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: device.createShaderModule({
          code: vertexCode,
        }),
      },
      fragment: {
        module: device.createShaderModule({
          code: fragmentCode,
        }),
        targets: [
          {
            format,
          },
        ],
      },
      primitive: {
        topology: 'triangle-strip',
      },
    });

    function encoder() {
      const commandEncoder = device!.createCommandEncoder();
      const textureView = context!.getCurrentTexture().createView();
      const renderPassDescriptor = {
        colorAttachments: [
          {
            view: textureView,
            clearValue: [0, 0, 0, 1],
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      };
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(pipeline);
      passEncoder.draw(5);
      passEncoder.end();
      device!.queue.submit([commandEncoder.finish()]);
    }

    function frame() {
      encoder();
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }, [canvas, context, format, adapter, device]);

  return (
    <div className="w-full h-full p-4 rounded-md shadow-lg shadow-slate-300 bg-slate-50">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
}
