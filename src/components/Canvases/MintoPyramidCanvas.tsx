import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Layers, Copy, Download, CheckCircle2, Plus, 
  Trash2, FileText, ArrowRight, Lightbulb, MessageSquareQuote, CheckSquare,
  GitBranch, ZoomIn, ZoomOut, RotateCcw, ChevronRight, ChevronDown,
  Sparkles, Network, Split
} from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

export type NodeType = 'apex' | 'pillar' | 'subbranch' | 'evidence';

export interface GraphNode {
  id: string;
  title: string;
  type: NodeType;
  isExpanded: boolean;
  children: GraphNode[];
}

interface LayoutNode {
  id: string;
  title: string;
  type: NodeType;
  isExpanded: boolean;
  childrenCount: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Connection {
  from: LayoutNode;
  to: LayoutNode;
}

export const MintoPyramidCanvas: React.FC = () => {
  const { lang } = useLanguage();

  // SCQA Narrative State
  const defaultSituation = lang === 'vi'
    ? 'Hệ thống thương mại điện tử hiện tại đang vận hành trên 4 cụm máy chủ on-premise truyền thống với 2,4 triệu người dùng hoạt động.'
    : 'Our e-commerce platform currently operates across 4 legacy on-premise datacenter clusters serving 2.4 million active users.';

  const defaultComplication = lang === 'vi'
    ? 'Lượng truy cập dịp cao điểm dự kiến tăng 3 lần, trong khi hạ tầng vật lý đã đạt 89% công suất và chi phí bảo trì phần cứng tăng vọt 45%.'
    : 'Peak traffic is forecasted to surge 3x, while on-premise compute has reached 89% capacity and hardware maintenance renewal costs jumped 45%.';

  const defaultQuestion = lang === 'vi'
    ? 'Làm thế nào để bảo đảm hệ thống vận hành thông suốt tuyệt đối trong đợt cao điểm mà không phải lãng phí chi phí gia hạn phần cứng?'
    : 'How can we guarantee zero downtime during peak traffic without overpaying for obsolete hardware maintenance contracts?';

  const defaultAnswer = lang === 'vi'
    ? 'Chuyển đổi toàn bộ các vi dịch vụ tải cao (giỏ hàng, thanh toán, kho vận) sang kiến trúc Hybrid Cloud linh hoạt trong vòng 45 ngày tới.'
    : 'Migrate critical high-throughput microservices (checkout, cart, inventory) to an auto-scaling Hybrid Cloud architecture within 45 days.';

  // Initial Tree Data (Default Cloud Migration Project)
  const defaultTreeData: GraphNode = useMemo(() => {
    return {
      id: 'root',
      title: defaultAnswer,
      type: 'apex',
      isExpanded: true,
      children: lang === 'vi' ? [
        {
          id: 'p1',
          title: '1. Triệt tiêu rủi ro quá tải hệ thống (Cam kết 99.99% SLA)',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p1-sub1',
              title: 'Tự động mở rộng (Auto-scaling) từ 10 lên 500 node chỉ trong 90 giây khi tải tăng đột biến.',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p1-sub2',
              title: 'Đã vượt qua bài kiểm thử tải mô phỏng 50.000 RPS với tỷ lệ lỗi dưới 0.001%.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        },
        {
          id: 'p2',
          title: '2. Tiết kiệm 28% tổng chi phí sở hữu (TCO) trong 3 năm',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p2-sub1',
              title: 'Cắt giảm ngay 140.000 USD chi phí phạt gia hạn bảo trì cụm máy chủ cũ.',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p2-sub2',
              title: 'Mô hình trả tiền theo dung lượng thực dùng (Pay-as-you-go) co cụm hạ tầng ngay sau đợt cao điểm.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        },
        {
          id: 'p3',
          title: '3. Tăng tốc độ phát hành tính năng kỹ thuật lên gấp 3 lần',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p3-sub1',
              title: 'Chuẩn hóa hạ tầng bằng mã nguồn (Infrastructure as Code - Terraform).',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p3-sub2',
              title: 'Rút ngắn chu kỳ release tính năng từ 4 ngày xuống còn dưới 35 phút.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        }
      ] : [
        {
          id: 'p1',
          title: '1. Eliminate system outage risk with 99.99% availability',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p1-sub1',
              title: 'Auto-scale capacity from 10 to 500 nodes in under 90 seconds during unexpected spikes.',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p1-sub2',
              title: 'Validated with 50,000 RPS simulated load test resulting in zero dropped connections.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        },
        {
          id: 'p2',
          title: '2. Reduce 3-year Total Cost of Ownership (TCO) by 28%',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p2-sub1',
              title: 'Avoid $140,000 in legacy on-premise hardware renewal penalty fees.',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p2-sub2',
              title: 'Elastic pay-as-you-go cloud billing scales down instantly post-peak season.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        },
        {
          id: 'p3',
          title: '3. Accelerate product delivery release cycle 3x',
          type: 'pillar',
          isExpanded: true,
          children: [
            {
              id: 'p3-sub1',
              title: 'Standardize environments using Infrastructure as Code (Terraform CI/CD pipelines).',
              type: 'evidence',
              isExpanded: true,
              children: []
            },
            {
              id: 'p3-sub2',
              title: 'Production feature deployment lead time reduced from 4 days to 35 minutes.',
              type: 'evidence',
              isExpanded: true,
              children: []
            }
          ]
        }
      ]
    };
  }, [defaultAnswer, lang]);

  const [situation, setSituation] = useState(defaultSituation);
  const [complication, setComplication] = useState(defaultComplication);
  const [question, setQuestion] = useState(defaultQuestion);
  const [answer, setAnswer] = useState(defaultAnswer);
  const [treeData, setTreeData] = useState<GraphNode>(defaultTreeData);

  // Sync tree root title when answer changes
  useEffect(() => {
    setTreeData(prev => ({ ...prev, title: answer }));
  }, [answer]);

  // Views and Canvas state
  const [activeTab, setActiveTab] = useState<'scqa' | 'pyramid' | 'tree' | 'memo'>('tree');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [copiedTree, setCopiedTree] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Recursive tree mutation helpers
  const updateNodeTitleInTree = (node: GraphNode, id: string, newTitle: string): GraphNode => {
    if (node.id === id) {
      return { ...node, title: newTitle };
    }
    return {
      ...node,
      children: node.children.map(c => updateNodeTitleInTree(c, id, newTitle))
    };
  };

  const addChildToTree = (node: GraphNode, parentId: string): GraphNode => {
    if (node.id === parentId) {
      let nextType: NodeType = 'evidence';
      if (node.type === 'apex') nextType = 'pillar';
      else if (node.type === 'pillar') nextType = 'subbranch';
      else if (node.type === 'subbranch') nextType = 'evidence';

      const childCount = node.children.length + 1;
      const defaultNewTitle = lang === 'vi'
        ? (nextType === 'pillar' ? `${childCount}. Trụ cột luận điểm mới (MECE)` : `Nhánh con / Minh chứng ${childCount}...`)
        : (nextType === 'pillar' ? `${childCount}. Key-Line Supporting Pillar (MECE)` : `Sub-branch / Supporting Metric ${childCount}...`);

      const newChild: GraphNode = {
        id: `node-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: defaultNewTitle,
        type: nextType,
        isExpanded: true,
        children: []
      };

      return {
        ...node,
        isExpanded: true,
        children: [...node.children, newChild]
      };
    }

    return {
      ...node,
      children: node.children.map(c => addChildToTree(c, parentId))
    };
  };

  const deleteNodeFromTree = (node: GraphNode, idToDelete: string): GraphNode => {
    return {
      ...node,
      children: node.children
        .filter(c => c.id !== idToDelete)
        .map(c => deleteNodeFromTree(c, idToDelete))
    };
  };

  const toggleExpandNode = (node: GraphNode, id: string): GraphNode => {
    if (node.id === id) {
      return { ...node, isExpanded: !node.isExpanded };
    }
    return {
      ...node,
      children: node.children.map(c => toggleExpandNode(c, id))
    };
  };

  // Handlers
  const handleUpdateTitle = (id: string, newTitle: string) => {
    if (id === 'root') {
      setAnswer(newTitle);
    }
    setTreeData(prev => updateNodeTitleInTree(prev, id, newTitle));
  };

  const handleAddChild = (parentId: string) => {
    setTreeData(prev => addChildToTree(prev, parentId));
  };

  const handleDeleteNode = (id: string) => {
    if (id === 'root') return; // Cannot delete root
    setTreeData(prev => deleteNodeFromTree(prev, id));
  };

  const handleToggleExpand = (id: string) => {
    setTreeData(prev => toggleExpandNode(prev, id));
  };

  // Presets Loader
  const loadPreset = (presetKey: 'cloud' | 'margin' | 'churn') => {
    if (presetKey === 'cloud') {
      setSituation(defaultSituation);
      setComplication(defaultComplication);
      setQuestion(defaultQuestion);
      setAnswer(defaultAnswer);
      setTreeData(defaultTreeData);
    } else if (presetKey === 'margin') {
      const pAns = lang === 'vi'
        ? 'Tái cấu trúc tỷ suất lợi nhuận thông qua 3 đòn bẩy: Tăng giá trị giỏ hàng AOV, Cắt giảm COGS và Tối ưu hóa chuỗi cung ứng 3PL.'
        : 'Restore gross margin via 3 strategic levers: Lift Average Order Value (AOV), Renegotiate COGS, and Streamline 3PL fulfillment.';

      setSituation(lang === 'vi'
        ? 'Doanh nghiệp thương mại điện tử tăng trưởng doanh thu 35% mỗi năm đạt mốc 120M USD.'
        : 'E-commerce business grew GMV by 35% annually reaching $120M.');
      setComplication(lang === 'vi'
        ? 'Tuy nhiên, biên lợi nhuận ròng rơi từ 9.2% xuống 3.4% do chi phí logistics và tỷ lệ hoàn trả tăng vọt.'
        : 'However, net operating margin declined from 9.2% to 3.4% due to return rates and surging courier surcharges.');
      setQuestion(lang === 'vi'
        ? 'Làm thế nào để khôi phục biên lợi nhuận ròng trên 8.5% trong 12 tháng mà không làm giảm tổng doanh thu?'
        : 'How can we restore net operating margins above 8.5% within 12 months without hurting GMV velocity?');
      setAnswer(pAns);

      setTreeData({
        id: 'root',
        title: pAns,
        type: 'apex',
        isExpanded: true,
        children: [
          {
            id: 'm-p1',
            title: lang === 'vi' ? '1. Nâng giá trị giỏ hàng trung bình (AOV) từ $45 lên $62' : '1. Lift Average Order Value (AOV) from $45 to $62',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'm-p1-1',
                title: lang === 'vi' ? 'Thiết lập ngưỡng miễn phí vận chuyển thông minh ở mức $75.' : 'Implement dynamic free-shipping threshold at $75.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'm-p1-2',
                title: lang === 'vi' ? 'Triển khai gợi ý gói combo AI tại bước thanh toán.' : 'Deploy AI cross-sell product bundles at checkout.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          },
          {
            id: 'm-p2',
            title: lang === 'vi' ? '2. Cắt giảm 8% giá vốn hàng bán (COGS)' : '2. Reduce Cost of Goods Sold (COGS) by 8%',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'm-p2-1',
                title: lang === 'vi' ? 'Đàm phán lại chiết khấu số lượng lớn với 10 nhà cung ứng dẫn đầu.' : 'Renegotiate volume discount rebates with top 10 suppliers.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'm-p2-2',
                title: lang === 'vi' ? 'Loại bỏ 15% mã hàng SKU tồn kho chậm có tỷ lệ hoàn trả cao.' : 'Purge bottom 15% slow-moving SKUs with high return rates.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          },
          {
            id: 'm-p3',
            title: lang === 'vi' ? '3. Tối ưu hóa chuỗi cung ứng & đàm phán hợp đồng 3PL' : '3. Consolidate 3PL logistics & fulfillment contracts',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'm-p3-1',
                title: lang === 'vi' ? 'Hợp nhất đơn vị vận chuyển chặng cuối nhận mức giá ưu đãi.' : 'Single-source primary last-mile courier contract for tiered volume discounts.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'm-p3-2',
                title: lang === 'vi' ? 'Ứng dụng thuật toán gom kiện hàng giúp giảm 22% số chuyến xe.' : 'Introduce cartonization algorithms cutting container waste by 22%.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          }
        ]
      });
    } else if (presetKey === 'churn') {
      const cAns = lang === 'vi'
        ? 'Triển khai chiến lược giữ chân khách hàng 3 trụ cột: Onboarding nhanh, Vá lỗi sản phẩm cốt lõi và Đội ngũ CS chuyên biệt.'
        : 'Deploy 3-pillar customer retention blitz: Rapid Onboarding, Core Product Defect Remediation, and Dedicated CSM Pods.';

      setSituation(lang === 'vi'
        ? 'Nền tảng B2B SaaS hiện có 15.000 khách hàng doanh nghiệp trả phí hàng tháng.'
        : 'B2B SaaS platform serves 15,000 monthly subscription business accounts.');
      setComplication(lang === 'vi'
        ? 'Tỷ lệ rời bỏ (Net Churn) tăng vọt từ 1.8% lên 4.5%/tháng sau bản cập nhật giá mới.'
        : 'Monthly gross churn rate spiked from 1.8% to 4.5% following major tier price restructuring.');
      setQuestion(lang === 'vi'
        ? 'Làm cách nào để hạ tỷ lệ rời bỏ khách hàng xuống dưới 1.5% trong vòng 90 ngày?'
        : 'How do we pull customer churn back below 1.5% within 90 days?');
      setAnswer(cAns);

      setTreeData({
        id: 'root',
        title: cAns,
        type: 'apex',
        isExpanded: true,
        children: [
          {
            id: 'c-p1',
            title: lang === 'vi' ? '1. Giảm 80% thời gian nhận giá trị ban đầu (Time-to-Value)' : '1. Cut Time-to-Value by 80% in the first 14 days',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'c-p1-1',
                title: lang === 'vi' ? 'Rút ngắn quy trình kích hoạt tài khoản từ 6 ngày xuống 45 phút.' : 'Streamline product onboarding workflow from 6 days to 45 minutes.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'c-p1-2',
                title: lang === 'vi' ? 'Hệ thống gửi tín hiệu cảnh báo tự động khi người dùng không đăng nhập sau 72 giờ.' : 'Automated telemetry triggers proactive outreach if account idle > 72 hours.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          },
          {
            id: 'c-p2',
            title: lang === 'vi' ? '2. Triệt tiêu 5 lỗi kỹ thuật bị phàn nàn nhiều nhất' : '2. Fix top 5 customer-reported engineering blockers',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'c-p2-1',
                title: lang === 'vi' ? 'Sửa dứt điểm lỗi đồng bộ webhook thời gian thực với Salesforce.' : 'Eliminate webhook sync latency with third-party CRM connectors.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'c-p2-2',
                title: lang === 'vi' ? 'Tăng tốc độ tải trang báo cáo phân tích nhanh gấp 4 lần.' : 'Upgrade reporting export query performance 4x.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          },
          {
            id: 'c-p3',
            title: lang === 'vi' ? '3. Thành lập đội ngũ Chuyên viên Thành công Khách hàng (CSM)' : '3. Launch Dedicated Strategic Customer Success Pods',
            type: 'pillar',
            isExpanded: true,
            children: [
              {
                id: 'c-p3-1',
                title: lang === 'vi' ? 'Chỉ định 1 CSM chăm sóc trực tiếp cho mỗi tài khoản có ARR > $10.000.' : 'Assign designated senior CSM to all accounts with ARR > $10k.',
                type: 'evidence',
                isExpanded: true,
                children: []
              },
              {
                id: 'c-p3-2',
                title: lang === 'vi' ? 'Chương trình chiết khấu 18% khi chuyển đổi sang hợp đồng trả trước hàng năm.' : 'Offer 18% incentive discount for switching to multi-year upfront commitment.',
                type: 'evidence',
                isExpanded: true,
                children: []
              }
            ]
          }
        ]
      });
    }
    setPan({ x: 40, y: 40 });
    setZoom(1);
  };

  // Layout Calculations
  const layout = useMemo(() => {
    const NODE_WIDTH = orientation === 'horizontal' ? 240 : 210;
    const NODE_HEIGHT = 92;
    const H_GAP = orientation === 'horizontal' ? 80 : 30;
    const V_GAP = orientation === 'horizontal' ? 24 : 80;
    const PADDING = 40;

    const nodes: LayoutNode[] = [];
    const connections: Connection[] = [];

    if (orientation === 'horizontal') {
      let currentY = PADDING;

      function layoutSubtreeH(node: GraphNode, depth: number): LayoutNode {
        const isLeaf = !node.children || node.children.length === 0 || node.isExpanded === false;
        const x = PADDING + depth * (NODE_WIDTH + H_GAP);

        if (isLeaf) {
          const y = currentY;
          currentY += NODE_HEIGHT + V_GAP;
          const placed: LayoutNode = {
            id: node.id,
            title: node.title,
            type: node.type,
            isExpanded: node.isExpanded,
            childrenCount: node.children ? node.children.length : 0,
            x,
            y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT
          };
          nodes.push(placed);
          return placed;
        }

        const childLayouts = node.children.map(c => layoutSubtreeH(c, depth + 1));
        const firstChildY = childLayouts[0].y;
        const lastChildY = childLayouts[childLayouts.length - 1].y;
        const y = (firstChildY + lastChildY) / 2;

        const placed: LayoutNode = {
          id: node.id,
          title: node.title,
          type: node.type,
          isExpanded: node.isExpanded,
          childrenCount: node.children.length,
          x,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
        nodes.push(placed);

        childLayouts.forEach(child => {
          connections.push({ from: placed, to: child });
        });

        return placed;
      }

      layoutSubtreeH(treeData, 0);
    } else {
      // Vertical orientation (Top-Down Pyramid)
      let currentX = PADDING;

      function layoutSubtreeV(node: GraphNode, depth: number): LayoutNode {
        const isLeaf = !node.children || node.children.length === 0 || node.isExpanded === false;
        const y = PADDING + depth * (NODE_HEIGHT + V_GAP);

        if (isLeaf) {
          const x = currentX;
          currentX += NODE_WIDTH + H_GAP;
          const placed: LayoutNode = {
            id: node.id,
            title: node.title,
            type: node.type,
            isExpanded: node.isExpanded,
            childrenCount: node.children ? node.children.length : 0,
            x,
            y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT
          };
          nodes.push(placed);
          return placed;
        }

        const childLayouts = node.children.map(c => layoutSubtreeV(c, depth + 1));
        const firstChildX = childLayouts[0].x;
        const lastChildX = childLayouts[childLayouts.length - 1].x;
        const x = (firstChildX + lastChildX) / 2;

        const placed: LayoutNode = {
          id: node.id,
          title: node.title,
          type: node.type,
          isExpanded: node.isExpanded,
          childrenCount: node.children.length,
          x,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
        nodes.push(placed);

        childLayouts.forEach(child => {
          connections.push({ from: placed, to: child });
        });

        return placed;
      }

      layoutSubtreeV(treeData, 0);
    }

    const maxX = Math.max(...nodes.map(n => n.x + n.width), 900) + PADDING;
    const maxY = Math.max(...nodes.map(n => n.y + n.height), 600) + PADDING;

    return { nodes, connections, totalWidth: maxX, totalHeight: maxY };
  }, [treeData, orientation]);

  // Pan & Zoom controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.4));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 40, y: 40 });
  };

  // Markdown recursive representation
  const generateMarkdownTree = (node: GraphNode, level = 0): string => {
    const indent = '  '.repeat(level);
    let icon = '🔍';
    if (node.type === 'apex') icon = '🏛️ [ĐỈNH THÁP - BLUF]';
    else if (node.type === 'pillar') icon = '📌 [TRỤ CỘT MECE]';
    else if (node.type === 'subbranch') icon = '🌿 [NHÁNH PHÂN TÍCH]';
    else icon = '📊 [MINH CHỨNG]';

    let res = `${indent}- ${icon} ${node.title}\n`;
    if (node.children && node.children.length > 0) {
      node.children.forEach(c => {
        res += generateMarkdownTree(c, level + 1);
      });
    }
    return res;
  };

  // Full Export Report
  const exportReport = () => {
    if (lang === 'vi') {
      return `# Báo Cáo Kim Tự Tháp Minto & Sơ Đồ Cây Phân Tích

## 1. Mở Đầu Theo Cốt Truyện SCQA (Executive Hook)
- **Bối cảnh (Situation):** ${situation}
- **Biến cố / Thách thức (Complication):** ${complication}
- **Câu hỏi chiến lược (Question):** ${question}
- **Khuyến nghị trọng tâm (Answer / BLUF):** ${answer}

---

## 2. Cấu Trúc Cây Phân Cấp Rẽ Nhánh (Tree Diagram Outline)
${generateMarkdownTree(treeData)}

---
*Được tạo bởi Problem-Solving Framework Chooser - Bảng Kim Tự Tháp Minto & Cây Đồ Thị Rẽ Nhánh*
`;
    }

    return `# Executive Briefing Memo: The Minto Pyramid Principle & Tree Diagram

## 1. SCQA Narrative Storyline (Executive Hook)
- **Situation:** ${situation}
- **Complication:** ${complication}
- **Question:** ${question}
- **Governing Answer (BLUF):** ${answer}

---

## 2. Hierarchical Tree Decomposition Outline
${generateMarkdownTree(treeData)}

---
*Created with Problem-Solving Framework Chooser Minto Pyramid & Tree Graph Canvas*
`;
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(exportReport());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyTreeMarkdown = async () => {
    const success = await copyToClipboard(generateMarkdownTree(treeData));
    if (success) {
      setCopiedTree(true);
      setTimeout(() => setCopiedTree(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile(`minto-tree-memo-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-sm">
              MINTO
            </span>
            {lang === 'vi' ? 'Bảng Kim Tự Tháp Minto & Sơ Đồ Cây Rẽ Nhánh' : 'The Minto Pyramid Principle & Interactive Tree Graph'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi'
              ? 'Mô hình hóa thông điệp Top-Down (Answer-First) qua sơ đồ cây rẽ nhánh kiểu đồ thị trực quan và cốt truyện SCQA.'
              : 'Model top-down executive communication with interactive branching tree graphs & the SCQA narrative hook.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : (lang === 'vi' ? 'Sao chép Markdown' : 'Copy Markdown')}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('tree')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'tree'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          {lang === 'vi' ? '1. Sơ Đồ Cây Rẽ Nhánh (Tree Graph)' : '1. Interactive Tree Graph'}
        </button>

        <button
          onClick={() => setActiveTab('scqa')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'scqa'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5" />
          {lang === 'vi' ? '2. Cốt Truyện SCQA' : '2. SCQA Narrative Hook'}
        </button>

        <button
          onClick={() => setActiveTab('pyramid')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'pyramid'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {lang === 'vi' ? '3. Tháp Luận Điểm MECE' : '3. MECE Pyramid Pillars'}
        </button>

        <button
          onClick={() => setActiveTab('memo')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'memo'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {lang === 'vi' ? '4. Bản Tóm Tắt Điều Hành' : '4. Executive Memo'}
        </button>
      </div>

      {/* TAB 1: VISUAL TREE GRAPH VIEW */}
      {activeTab === 'tree' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {/* Tree Toolbar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {/* Left: Orientation & Presets */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                {lang === 'vi' ? 'Kiểu đồ thị:' : 'Layout:'}
              </span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setOrientation('horizontal')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                    orientation === 'horizontal'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Cây rẽ nhánh ngang (Trái sang Phải)"
                >
                  <Split className="w-3 h-3" />
                  {lang === 'vi' ? 'Ngang (Issue Tree)' : 'Horizontal'}
                </button>
                <button
                  onClick={() => setOrientation('vertical')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                    orientation === 'vertical'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Cây kim tự tháp dọc (Trên xuống Dưới)"
                >
                  <Network className="w-3 h-3" />
                  {lang === 'vi' ? 'Dọc (Kim Tự Tháp)' : 'Vertical'}
                </button>
              </div>

              {/* Presets dropdown */}
              <select
                onChange={(e) => loadPreset(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                defaultValue="cloud"
              >
                <option value="cloud">{lang === 'vi' ? 'Mẫu 1: Chuyển đổi Cloud' : 'Preset 1: Cloud Migration'}</option>
                <option value="margin">{lang === 'vi' ? 'Mẫu 2: Tối ưu lợi nhuận MECE' : 'Preset 2: Margin Optimization'}</option>
                <option value="churn">{lang === 'vi' ? 'Mẫu 3: Giảm rời bỏ khách hàng' : 'Preset 3: Churn Reduction'}</option>
              </select>
            </div>

            {/* Right: Zoom & Export Tree Outline */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 font-mono text-[11px] min-w-[38px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetView}
                  className="p-1 hover:text-white transition-colors border-l border-slate-800"
                  title={lang === 'vi' ? 'Đặt lại góc nhìn' : 'Reset View'}
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleCopyTreeMarkdown}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 border border-slate-700 transition-colors"
                title={lang === 'vi' ? 'Sao chép cấu trúc cây dạng Markdown' : 'Copy Tree as Markdown Outline'}
              >
                {copiedTree ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedTree ? (lang === 'vi' ? 'Đã chép cây!' : 'Copied!') : (lang === 'vi' ? 'Chép cây Markdown' : 'Copy Outline')}
              </button>
            </div>
          </div>

          {/* Graph Visual Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-[620px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
          >
            {/* Guide hint overlay */}
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-slate-900/80 backdrop-blur border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400 flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {lang === 'vi'
                  ? 'Kéo rê chuột để di chuyển • Nhấp [+] để rẽ nhánh con • Bấm [-]/[+] để thu gọn'
                  : 'Drag to pan • Click [+] to branch child • Toggle [-]/[+] to collapse'}
              </span>
            </div>

            {/* Transform Canvas Surface */}
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: '0 0',
                transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                width: layout.totalWidth,
                height: layout.totalHeight
              }}
              className="absolute top-0 left-0"
            >
              {/* SVG Connecting Bezier Curves */}
              <svg
                width={layout.totalWidth}
                height={layout.totalHeight}
                className="absolute top-0 left-0 pointer-events-none"
              >
                <defs>
                  <linearGradient id="link-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="link-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {layout.connections.map((conn, idx) => {
                  let path = '';
                  let x1 = 0;
                  let y1 = 0;
                  let x2 = 0;
                  let y2 = 0;

                  if (orientation === 'horizontal') {
                    x1 = conn.from.x + conn.from.width;
                    y1 = conn.from.y + conn.from.height / 2;
                    x2 = conn.to.x;
                    y2 = conn.to.y + conn.to.height / 2;
                    const dx = (x2 - x1) * 0.5;
                    path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
                  } else {
                    x1 = conn.from.x + conn.from.width / 2;
                    y1 = conn.from.y + conn.from.height;
                    x2 = conn.to.x + conn.to.width / 2;
                    y2 = conn.to.y;
                    const dy = (y2 - y1) * 0.5;
                    path = `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
                  }

                  return (
                    <g key={`conn-${idx}`}>
                      <path
                        d={path}
                        fill="none"
                        stroke={orientation === 'horizontal' ? 'url(#link-gradient-h)' : 'url(#link-gradient-v)'}
                        strokeWidth="2"
                        className="transition-all"
                      />
                      <circle cx={x1} cy={y1} r="3" fill="#818cf8" />
                      <circle cx={x2} cy={y2} r="3" fill="#6366f1" />
                    </g>
                  );
                })}
              </svg>

              {/* Render Graph Nodes */}
              {layout.nodes.map((node) => {
                const isApex = node.type === 'apex';
                const isPillar = node.type === 'pillar';
                const isSubbranch = node.type === 'subbranch';
                const hasChildren = node.childrenCount > 0;

                // Color Themes per Node Type
                let badgeClass = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
                let cardBorder = 'border-slate-800 bg-slate-900/95 hover:border-slate-700';
                let roleLabel = lang === 'vi' ? 'DỮ LIỆU / MINH CHỨNG' : 'EVIDENCE';

                if (isApex) {
                  badgeClass = 'text-indigo-300 bg-indigo-950/60 border-indigo-500/50';
                  cardBorder = 'border-indigo-500/70 bg-gradient-to-br from-indigo-950/90 to-slate-900/95 shadow-xl shadow-indigo-950/50 ring-1 ring-indigo-500/30';
                  roleLabel = lang === 'vi' ? 'ĐỈNH THÁP • BLUF' : 'APEX • BLUF';
                } else if (isPillar) {
                  badgeClass = 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
                  cardBorder = 'border-cyan-500/40 bg-slate-900/95 hover:border-cyan-400/80 shadow-md';
                  roleLabel = lang === 'vi' ? 'TRỤ CỘT • MECE' : 'PILLAR • MECE';
                } else if (isSubbranch) {
                  badgeClass = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
                  cardBorder = 'border-amber-500/30 bg-slate-900/95 hover:border-amber-400/70 shadow-sm';
                  roleLabel = lang === 'vi' ? 'NHÁNH PHÂN TÍCH' : 'SUB-BRANCH';
                }

                return (
                  <div
                    key={node.id}
                    style={{
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`absolute rounded-xl border p-2 flex flex-col justify-between transition-all backdrop-blur-sm ${cardBorder}`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}>
                        {roleLabel}
                      </span>

                      <div className="flex items-center gap-0.5">
                        {/* Collapse / Expand toggle button if has children */}
                        {hasChildren && (
                          <button
                            onClick={() => handleToggleExpand(node.id)}
                            className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title={node.isExpanded ? (lang === 'vi' ? 'Thu gọn nhánh' : 'Collapse') : (lang === 'vi' ? 'Mở rộng nhánh' : 'Expand')}
                          >
                            {node.isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                            ) : (
                              <span className="flex items-center gap-0.5 text-[9px] font-bold text-indigo-400 bg-indigo-950/60 px-1 rounded border border-indigo-800">
                                <ChevronRight className="w-2.5 h-2.5" />
                                +{node.childrenCount}
                              </span>
                            )}
                          </button>
                        )}

                        {/* Delete node button (non-root) */}
                        {!isApex && (
                          <button
                            onClick={() => handleDeleteNode(node.id)}
                            className="p-0.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                            title={lang === 'vi' ? 'Xóa nhánh này' : 'Delete branch'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline Title Textarea */}
                    <textarea
                      rows={2}
                      value={node.title}
                      onChange={(e) => handleUpdateTitle(node.id, e.target.value)}
                      placeholder={lang === 'vi' ? 'Nhập nội dung luận điểm...' : 'Enter node statement...'}
                      className={`w-full bg-slate-950/80 border border-slate-800/80 rounded px-1.5 py-1 text-white leading-tight resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        isApex ? 'text-[11px] font-bold' : isPillar ? 'text-[11px] font-semibold' : 'text-[10px] text-slate-300'
                      }`}
                    />

                    {/* Node Footer: Add child button */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleAddChild(node.id)}
                        className="text-[9px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 transition-colors"
                        title={lang === 'vi' ? 'Rẽ thêm một nhánh con cấp dưới' : 'Add child sub-branch'}
                      >
                        <Plus className="w-2.5 h-2.5" />
                        {lang === 'vi' ? 'Thêm nhánh' : 'Add child'}
                      </button>

                      <span className="text-[8px] font-mono text-slate-600">
                        {node.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCQA STORYLINE */}
      {activeTab === 'scqa' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-3.5 text-xs text-indigo-300 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
            <div>
              <strong className="font-semibold text-white">
                {lang === 'vi' ? 'Quy tắc vàng của Barbara Minto:' : 'Barbara Minto’s Golden Rule:'}
              </strong>{' '}
              {lang === 'vi'
                ? 'Hãy thu hút sự chú ý của người nghe trước bằng câu chuyện mà họ hoàn toàn đồng tình (S), giới thiệu biến cố kích hoạt (C), đặt câu hỏi then chốt (Q) rồi lập tức tung ra câu trả lời trọng tâm (A - BLUF).'
                : 'Hook stakeholder attention with unquestioned context (S), introduce the disruptive catalyst (C), articulate the core question (Q), and instantly deliver your governing answer (A - BLUF).'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Situation */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  S • {lang === 'vi' ? 'BỐI CẢNH (SITUATION)' : 'SITUATION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Sự thật hiển nhiên, không tranh cãi' : 'Non-controversial agreed reality'}
                </span>
              </div>
              <textarea
                rows={3}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder={lang === 'vi' ? 'Mô tả bối cảnh hiện tại mà mọi người đều đồng ý...' : 'State the established status quo everyone agrees with...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Complication */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  C • {lang === 'vi' ? 'BIẾN CỐ & THÁCH THỨC (COMPLICATION)' : 'COMPLICATION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Điều gì đã thay đổi / Đe dọa / Cơ hội' : 'The trigger or shift that creates tension'}
                </span>
              </div>
              <textarea
                rows={3}
                value={complication}
                onChange={(e) => setComplication(e.target.value)}
                placeholder={lang === 'vi' ? 'Điều gì đột ngột phát sinh tạo ra trở ngại hoặc đe dọa mục tiêu?...' : 'What changed or broke, forcing a decision?...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Question */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Q • {lang === 'vi' ? 'CÂU HỎI THEN CHỐT (QUESTION)' : 'QUESTION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Chúng ta cần giải bài toán gì?' : 'The focal question demanding resolution'}
                </span>
              </div>
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={lang === 'vi' ? 'Đặt câu hỏi trọng tâm phát sinh từ biến cố trên...' : 'State the central question that arises from the complication...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Answer */}
            <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  A • {lang === 'vi' ? 'CÂU TRẢ LỜI TRỌNG TÂM (ANSWER / BLUF)' : 'ANSWER (GOVERNING THOUGHT)'}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {lang === 'vi' ? 'Đỉnh kim tự tháp (Bottom Line Up Front)' : 'Apex of the pyramid'}
                </span>
              </div>
              <textarea
                rows={3}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={lang === 'vi' ? 'Khuyến nghị hành động cốt lõi rõ ràng trong 1 câu duy nhất...' : 'State your core recommendation or answer clearly in 1 sentence...'}
                className="w-full bg-slate-950 border border-indigo-500/40 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 font-medium leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('tree')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              {lang === 'vi' ? 'Xem Sơ Đồ Cây Rẽ Nhánh' : 'View Interactive Tree Graph'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: TRADITIONAL PYRAMID STRUCTURE */}
      {activeTab === 'pyramid' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* APEX LEVEL */}
          <div className="rounded-2xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/60 to-slate-900/60 p-5 text-center space-y-2 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
              {lang === 'vi' ? 'TẦNG 1: ĐỈNH KIM TỰ THÁP (THÔNG ĐIỆP CỐT LÕI / GOVERNING THOUGHT)' : 'TIER 1: PYRAMID APEX (GOVERNING THOUGHT / BLUF)'}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white max-w-3xl mx-auto pt-1">
              "{treeData.title}"
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'vi' ? 'Được nâng đỡ bằng các trụ cột MECE độc lập bên dưới:' : 'Directly supported by the MECE key-line pillars below:'}
            </p>
          </div>

          {/* TIER 2: PILLARS CARDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'vi' ? 'TẦNG 2: CÁC TRỤ CỘT LUẬN ĐIỂM (KEY-LINE PILLARS)' : 'TIER 2: SUPPORTING MECE PILLARS'}
                </h4>
                <p className="text-xs text-slate-400">
                  {lang === 'vi'
                    ? 'Mỗi trụ cột trả lời câu hỏi "Tại sao?" hoặc "Làm thế nào?" cho thông điệp đỉnh tháp.'
                    : 'Each pillar answers "Why?" or "How?" for the governing thought at the apex.'}
                </p>
              </div>

              <button
                onClick={() => handleAddChild('root')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                {lang === 'vi' ? 'Thêm Trụ Cột' : 'Add Pillar'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {treeData.children.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        {lang === 'vi' ? 'Trụ Cột Luận Điểm' : 'Key-Line Pillar'}
                      </span>
                      <button
                        onClick={() => handleDeleteNode(pillar.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title={lang === 'vi' ? 'Xóa trụ cột' : 'Delete pillar'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handleUpdateTitle(pillar.id, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />

                    {/* Evidence Points */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <CheckSquare className="w-3 h-3 text-emerald-400" />
                        {lang === 'vi' ? 'Số liệu / Bằng chứng minh chứng:' : 'Evidentiary Data & Metrics:'}
                      </label>

                      {pillar.children.map((ev) => (
                        <div key={ev.id} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={ev.title}
                            onChange={(e) => handleUpdateTitle(ev.id, e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-snug"
                          />
                          <button
                            onClick={() => handleDeleteNode(ev.id)}
                            className="text-slate-600 hover:text-rose-400 p-1 mt-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddChild(pillar.id)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-1 font-medium"
                      >
                        <Plus className="w-3 h-3" /> {lang === 'vi' ? 'Thêm bằng chứng' : 'Add metric'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXECUTIVE MEMO PREVIEW */}
      {activeTab === 'memo' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
              {lang === 'vi' ? 'BẢN GHI CHÚ ĐIỀU HÀNH CHUẨN MỰC MCKINSEY' : 'MCKINSEY-STANDARD EXECUTIVE MEMO'}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">
              {lang === 'vi' ? 'Đề Xuất & Khuyến Nghị Quyết Định' : 'Strategic Recommendation & Executive Briefing'}
            </h3>
          </div>

          {/* Narrative Hook */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-2 text-xs leading-relaxed">
            <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
              {lang === 'vi' ? 'Bối Cảnh & Vấn Đề (SCQA Narrative Context)' : 'Context & Strategic Dilemma (SCQA)'}
            </h4>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Bối cảnh:' : 'Situation:'}</strong> {situation}</p>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Biến cố:' : 'Complication:'}</strong> {complication}</p>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Câu hỏi cốt lõi:' : 'Focal Question:'}</strong> {question}</p>
          </div>

          {/* Governing Recommendation */}
          <div className="bg-indigo-950/30 rounded-xl p-4 border border-indigo-500/40 text-xs space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
              {lang === 'vi' ? 'KHUYẾN NGHỊ HÀNH ĐỘNG (ANSWER / BOTTOM LINE UP FRONT)' : 'CORE RECOMMENDATION (BLUF)'}
            </span>
            <p className="text-sm font-bold text-white pt-1">
              {treeData.title}
            </p>
          </div>

          {/* Hierarchical Structure Outline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'vi' ? 'Cấu Trúc Luận Điểm Nâng Đỡ (Hierarchical Tree Breakdown)' : 'Strategic Tree Decomposition'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {treeData.children.map(pillar => (
                <div key={pillar.id} className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-white text-xs">{pillar.title}</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                    {pillar.children.map((child) => (
                      <li key={child.id}>{child.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
