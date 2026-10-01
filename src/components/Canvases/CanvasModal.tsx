import React from 'react';
import { CanvasType } from '../../types/framework';
import { X } from 'lucide-react';
import { FiveWhysCanvas } from './FiveWhysCanvas';
import { FishboneCanvas } from './FishboneCanvas';
import { RiceCanvas } from './RiceCanvas';
import { CynefinCanvas } from './CynefinCanvas';
import { EisenhowerCanvas } from './EisenhowerCanvas';
import { ScamperCanvas } from './ScamperCanvas';
import { A3Canvas } from './A3Canvas';

interface CanvasModalProps {
  canvasType: CanvasType;
  frameworkName?: string;
  onClose: () => void;
}

export const CanvasModal: React.FC<CanvasModalProps> = ({ canvasType, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Canvas Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-10px)]">
          {canvasType === 'five-whys' && <FiveWhysCanvas />}
          {canvasType === 'fishbone' && <FishboneCanvas />}
          {canvasType === 'rice-calc' && <RiceCanvas />}
          {canvasType === 'cynefin-tester' && <CynefinCanvas />}
          {canvasType === 'eisenhower-board' && <EisenhowerCanvas />}
          {canvasType === 'scamper-board' && <ScamperCanvas />}
          {canvasType === 'a3-canvas' && <A3Canvas />}
          {canvasType === 'action-plan' && <A3Canvas />}
        </div>
      </div>
    </div>
  );
};
