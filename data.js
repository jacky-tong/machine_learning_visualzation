// ===== 机器学习复习数据 =====
// 按老师划的重点章节组织，全11章

const chapters = [
  // ===== 第一章：绪论 =====
  {
    id: 'ch1', num: 1, title: '绪论', priority: 'low',
    desc: '核心概念：机器学习定义、监督/无监督学习、归纳偏好、发展历程。题型：选择/判断为主。',
    sections: [
      {
        id: 'ch1-1', title: '机器学习定义', tag: '概念',
        content: `
        <p><strong>机器学习：</strong>利用<strong>经验</strong>（数据）来改善计算机系统<strong>自身性能</strong>的学科。</p>
        <p>Mitchell更形式化的定义：假设用 <span class="katex-inline">P</span> 评估某类任务 <span class="katex-inline">T</span> 的性能，若一个程序通过利用经验 <span class="katex-inline">E</span> 在 <span class="katex-inline">T</span> 上获得了性能改善，则称该程序从经验 <span class="katex-inline">E</span> 中<strong>学习</strong>。</p>
        <p><strong>核心三要素：</strong>任务(Task)、经验(Experience)、性能(Performance)。</p>
        `,
        formulas: ['P(T,E,P)']
      },
      {
        id: 'ch1-2', title: '监督学习 vs 无监督学习', tag: '概念',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th>对比维度</th><th>监督学习</th><th>无监督学习</th></tr>
          <tr><td>训练数据</td><td>有标记(Label)</td><td>无标记</td></tr>
          <tr><td>典型任务</td><td>分类(离散)、回归(连续)</td><td>聚类</td></tr>
          <tr><td>目标</td><td>学习输入到输出的映射</td><td>发现数据内在结构</td></tr>
          <tr><td>例子</td><td>垃圾邮件分类、房价预测</td><td>用户分群、主题发现</td></tr>
        </table>
        </div>
        <p><strong>分类 vs 回归：</strong>分类预测<strong>离散值</strong>（如好瓜/坏瓜），回归预测<strong>连续值</strong>（如瓜的成熟度0.95）。</p>
        <p><strong>聚类：</strong>将样本划分为若干不相交的子集（簇），簇内相似度高、簇间相似度低。</p>
        `,
        formulas: []
      },
      {
        id: 'ch1-3', title: '归纳偏好与奥卡姆剃刀', tag: '概念',
        content: `
        <p><strong>归纳偏好：</strong>学习算法在假设空间中做选择的<strong>启发式原则</strong>。当多个假设在训练集上表现一致时，根据偏好选择其中一个。</p>
        <div class="tip-box"><strong>奥卡姆剃刀(Occam's Razor)：</strong>「若有多个假设与观察一致，则选最简单的那个。」—— 即偏好更"平滑"的模型。</div>
        <p><strong>NFL定理(No Free Lunch)：</strong>所有学习算法的<strong>总期望性能相同</strong>。谈论算法的优劣必须针对<strong>具体问题</strong>。算法好坏的比较必须结合实际应用场景。</p>
        `,
        formulas: []
      },
      {
        id: 'ch1-4', title: '发展历程（判断/选择题）', tag: '概念',
        content: `
        <ul>
          <li><strong>推理期(1950s-1960s)：</strong>A. Newell & H. Simon 的"逻辑理论家"程序，强调逻辑推理能力。</li>
          <li><strong>知识期(1970s-1980s)：</strong>专家系统盛行，Feigenbaum 提出"知识工程"，认为知识是智能的关键。</li>
          <li><strong>学习期(1980s至今)：</strong>从数据中学习。1980年第一届ICML，1986年BP算法再发明，1995年SVM提出，2006年深度学习兴起。</li>
        </ul>
        `,
        formulas: []
      }
    ]
  },

  // ===== 第二章：模型评估与选择 =====
  {
    id: 'ch2', num: 2, title: '模型评估与选择', priority: 'high',
    desc: '评估方法（留出法、交叉验证、自助法）+ 性能度量（查准率/查全率、PR/ROC、AUC）+ 偏差方差权衡。简答题高频。',
    sections: [
      {
        id: 'ch2-1', title: '留出法 (Hold-out)', tag: '概念',
        content: `
        <p><strong>做法：</strong>将数据集 <span class="katex-inline">D</span> 划分为两个互斥集：训练集 <span class="katex-inline">S</span> 和测试集 <span class="katex-inline">T</span>。</p>
        <p><strong>关键：分层采样(Stratified Sampling)</strong>——保持训练/测试集中各类别比例与原始数据集一致，避免因划分方式引入偏差。</p>
        <p><strong>注意：</strong>单次划分不稳定，一般需多次随机划分取平均。常见比例：2/3~4/5 用于训练。</p>
        `,
        formulas: ['D=S \\cup T, S \\cap T=\\emptyset']
      },
      {
        id: 'ch2-2', title: '交叉验证法 (Cross Validation)', tag: '概念',
        content: `
        <p><strong>k折交叉验证：</strong>将数据集 <span class="katex-inline">D</span> 划分为 <span class="katex-inline">k</span> 个大小相似的互斥子集，每次用 <span class="katex-inline">k-1</span> 个子集训练、1个测试，共 <span class="katex-inline">k</span> 次。</p>
        <p><strong>留一法(LOO, Leave-One-Out)：</strong><span class="katex-inline">k=m</span>（样本数）的特例。每个样本单独作为测试集。</p>
        <div class="tip-box"><strong>留一法优缺点：</strong>✅ 训练集最接近原始数据集，评估结果较准确；❌ 计算开销大，<span class="katex-inline">m</span> 个样本需训练 <span class="katex-inline">m</span> 次模型。</div>
        `,
        formulas: []
      },
      {
        id: 'ch2-3', title: '自助法 (Bootstrap) 与包外估计', tag: '概念',
        content: `
        <p><strong>做法：</strong>从包含 <span class="katex-inline">m</span> 个样本的数据集 <span class="katex-inline">D</span> 中，有放回地采样 <span class="katex-inline">m</span> 次，得到训练集 <span class="katex-inline">D'</span>。</p>
        <p><strong>包外估计(Out-of-Bag, OOB)：</strong>未被采样到的样本（约36.8%）作为测试集。</p>
        <div class="formula-box">
          <div class="formula-title">样本在m次采样中始终不被采到的概率：</div>
          <p>$$\\lim_{m \\to \\infty} \\left(1 - \\frac{1}{m}\\right)^m = \\frac{1}{e} \\approx 0.368$$</p>
        </div>
        <p><strong>适用场景：</strong>数据集较小、难以有效划分训练/测试集时使用。对集成学习（如随机森林的包外估计）特别有用。</p>
        `,
        formulas: ['\\lim_{m \\to \\infty} (1-\\frac{1}{m})^m = 1/e \\approx 0.368']
      },
      {
        id: 'ch2-4', title: '混淆矩阵与查准率/查全率', tag: '计算',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th></th><th>预测为正</th><th>预测为反</th></tr>
          <tr><td><strong>真实为正</strong></td><td>TP (真正例)</td><td>FN (假反例)</td></tr>
          <tr><td><strong>真实为反</strong></td><td>FP (假正例)</td><td>TN (真反例)</td></tr>
        </table>
        </div>
        <div class="formula-box">
          <div class="formula-title">核心公式：</div>
          <p>$$\\text{查准率(Precision)}: P = \\frac{TP}{TP + FP}$$</p>
          <p>$$\\text{查全率(Recall)}: R = \\frac{TP}{TP + FN}$$</p>
          <p>$$\\text{F1度量}: F1 = \\frac{2 \\times P \\times R}{P + R} = \\frac{2 \\times TP}{总样本 + TP - TN}$$</p>
        </div>
        <p><strong>查准率(P)：</strong>预测为正的样本中真正为正的比例（"准不准"）。</p>
        <p><strong>查全率(R)：</strong>真正为正的样本中被预测出来的比例（"全不全"）。</p>
        <p><strong>P-R曲线：</strong>以查全率为横轴、查准率为纵轴，按预测置信度排序后逐样本计算。</p>
        `,
        formulas: ['P = TP/(TP+FP)', 'R = TP/(TP+FN)', 'F1 = 2PR/(P+R)']
      },
      {
        id: 'ch2-5', title: 'ROC曲线与AUC', tag: '计算',
        content: `
        <p><strong>ROC曲线：</strong>纵轴为真正例率(TPR)，横轴为假正例率(FPR)。</p>
        <div class="formula-box">
          <div class="formula-title">TPR (真正例率) = 查全率：</div>
          <p>$$TPR = \\frac{TP}{TP + FN}$$</p>
          <div class="formula-title">FPR (假正例率)：</div>
          <p>$$FPR = \\frac{FP}{FP + TN}$$</p>
        </div>
        <p><strong>AUC：</strong>ROC曲线下的面积。AUC越大，模型性能越好（最大为1）。</p>
        <div class="step-box">
          <div class="step-title">AUC计算步骤（排序法）：</div>
          <ol>
            <li>将所有样本按预测概率从大到小排序</li>
            <li>为每个正例统计其前面负例的个数，求和</li>
            <li>代入公式：$$AUC = \\frac{\\sum_{i \\in pos} rank_i - \\frac{M(M+1)}{2}}{M \\times N}$$
            其中 <span class="katex-inline">M</span> 为正例数，<span class="katex-inline">N</span> 为负例数</li>
          </ol>
        </div>
        <div class="tip-box"><strong>P-R vs ROC：</strong>P-R曲线关注正例的预测效果，ROC同时关注正例和负例。当正负样本分布变化时，ROC曲线更稳定。</div>
        `,
        formulas: ['TPR = TP/(TP+FN)', 'FPR = FP/(FP+TN)', 'AUC = (Σrank - M(M+1)/2) / (M×N)']
      },
      {
        id: 'ch2-6', title: '偏差与方差权衡', tag: '概念',
        content: `
        <p><strong>泛化误差 = 偏差² + 方差 + 噪声</strong></p>
        <ul>
          <li><strong>偏差(Bias)：</strong>模型<strong>预测期望</strong>与真实值之间的差距。反映模型<strong>拟合能力</strong>。</li>
          <li><strong>方差(Variance)：</strong>不同训练集上模型输出的<strong>波动程度</strong>。反映模型对数据扰动的<strong>稳定性</strong>。</li>
          <li><strong>噪声(Noise)：</strong>问题本身的难度下限，无法通过算法优化消除。</li>
        </ul>
        <p><strong>偏差-方差窘境(Bias-Variance Dilemma)：</strong>训练不足时偏差主导，训练过度时方差主导（过拟合）。需在二者间权衡。</p>
        <div class="exam-tip"><strong>📌 关联考点：</strong>Boosting主要降低偏差（串行，逐步拟合残差），Bagging主要降低方差（并行，取平均平滑波动）。这是第8章集成学习的理论基础。</div>
        `,
        formulas: ['E(f;D) = bias^2 + var + \\epsilon^2']
      }
    ]
  },

  // ===== 第三章：线性模型 =====
  {
    id: 'ch3', num: 3, title: '线性模型', priority: 'high',
    desc: '对数几率回归（分类模型！）、LDA、多分类拆分策略、类别不平衡处理。',
    sections: [
      {
        id: 'ch3-1', title: '对数几率回归（逻辑回归）', tag: '概念',
        content: `
        <div class="warn-box"><strong>⚠️ 易错提醒：</strong>对数几率回归虽然名字里有"回归"，但它是<strong>分类模型</strong>！用于二分类任务。</div>
        <p><strong>核心思想：</strong>用线性回归的预测结果去逼近真实标记的<strong>对数几率</strong>。使用<strong>Sigmoid函数</strong>（对数几率函数）作为替代函数，将实数值映射到 (0,1) 区间。</p>
        <div class="formula-box">
          <div class="formula-title">Sigmoid函数：</div>
          <p>$$y = \\frac{1}{1 + e^{-z}}$$</p>
        </div>
        <p><strong>优势：</strong>直接对分类可能性建模，无需事先假设数据分布；不仅给出分类结果，还能给出概率预测。</p>
        `,
        formulas: ['y = 1 / (1 + e^{-z})']
      },
      {
        id: 'ch3-2', title: 'LDA（线性判别分析）', tag: '概念',
        content: `
        <p><strong>核心思想：</strong>将样本投影到一条直线上，使同类样本投影点尽可能<strong>近</strong>（类内散度小），异类样本投影点尽可能<strong>远</strong>（类间散度大）。</p>
        <div class="formula-box">
          <div class="formula-title">最大化目标（广义瑞利商）：</div>
          <p>$$J = \\frac{\\text{类间散度}}{\\text{类内散度}} = \\frac{w^T S_b w}{w^T S_w w}$$</p>
          <p>其中 <span class="katex-inline">S_b</span> 为类间散度矩阵，<span class="katex-inline">S_w</span> 为类内散度矩阵。</p>
        </div>
        <p><strong>求解：</strong>转化为广义特征值问题 <span class="katex-inline">S_b w = \\lambda S_w w</span>，最终解为 <span class="katex-inline">w = S_w^{-1}(\\mu_0 - \\mu_1)</span>。</p>
        `,
        formulas: ['J = w^T S_b w / w^T S_w w']
      },
      {
        id: 'ch3-3', title: '多分类学习：拆分策略', tag: '概念',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th>策略</th><th>做法</th><th>分类器数量(N类)</th></tr>
          <tr><td><strong>OvO</strong> (一对一)</td><td>每两类训练一个分类器</td><td><span class="katex-inline">N(N-1)/2</span></td></tr>
          <tr><td><strong>OvR</strong> (一对其余)</td><td>每类作为正例，其余所有为负例</td><td><span class="katex-inline">N</span></td></tr>
          <tr><td><strong>MvM</strong> (多对多)</td><td>若干类作为正例，若干类作为负例</td><td>取决于编码矩阵</td></tr>
        </table>
        </div>
        <p><strong>OvO vs OvR 选择：</strong>OvO分类器多但每个训练快（只用两类数据）；OvR分类器少但每个用全部数据。存储和测试时间需权衡。</p>
        <p><strong>ECOC（纠错输出码）：</strong>MvM的一种实现，引入编码-解码的思想，具有一定容错能力。</p>
        `,
        formulas: ['N_{OvO} = N(N-1)/2']
      },
      {
        id: 'ch3-4', title: '类别不平衡问题', tag: '概念',
        content: `
        <p><strong>再缩放(Rescaling)三种策略：</strong></p>
        <ul>
          <li><strong>过采样(Oversampling)：</strong>增加少数类样本，如SMOTE算法（合成新样本而非简单复制）</li>
          <li><strong>欠采样(Undersampling)：</strong>减少多数类样本，如EasyEnsemble</li>
          <li><strong>阈值移动(Threshold-moving)：</strong>基于原始训练集训练，预测时调整决策阈值</li>
        </ul>
        <div class="formula-box">
          <div class="formula-title">再缩放基本思想：</div>
          <p>若 <span class="katex-inline">\\frac{y}{1-y} > \\frac{m^+}{m^-}</span> 则预测为正例（<span class="katex-inline">m^+</span>为正例数，<span class="katex-inline">m^-</span>为负例数）</p>
        </div>
        `,
        formulas: ['y/(1-y) > m^+/m^-']
      }
    ]
  },

  // ===== 第四章：决策树 =====
  {
    id: 'ch4', num: 4, title: '决策树', priority: 'high',
    desc: '划分选择（信息熵、基尼指数）+ 剪枝 + 连续值/缺失值处理。计算题高频！',
    sections: [
      {
        id: 'ch4-1', title: '信息熵计算', tag: '计算',
        content: `
        <p><strong>信息熵：</strong>度量样本集合<strong>纯度</strong>的指标。熵越小，纯度越高。</p>
        <div class="formula-box">
          <div class="formula-title">信息熵公式：</div>
          <p>$$Ent(D) = -\\sum_{k=1}^{|\\mathcal{Y}|} p_k \\log_2 p_k$$</p>
          <p>其中 <span class="katex-inline">p_k</span> 为第 <span class="katex-inline">k</span> 类样本所占比例。当样本全部属于同一类时，熵为0（最小）；当各类均匀分布时，熵最大。</p>
        </div>
        `,
        formulas: ['Ent(D) = -Σ p_k log_2 p_k']
      },
      {
        id: 'ch4-2', title: '信息增益与增益率', tag: '计算',
        content: `
        <div class="formula-box">
          <div class="formula-title">信息增益（ID3算法用）：</div>
          <p>$$Gain(D, a) = Ent(D) - \\sum_{v=1}^{V} \\frac{|D^v|}{|D|} Ent(D^v)$$</p>
        </div>
        <p><strong>信息增益的偏好：</strong>对取值数目较多的属性有偏好。例如"编号"属性每个样本都不同，信息增益最大但无泛化能力。</p>
        <div class="formula-box">
          <div class="formula-title">增益率（C4.5算法用，克服上述偏好）：</div>
          <p>$$Gain\\_ratio(D, a) = \\frac{Gain(D, a)}{IV(a)}$$</p>
          <p>其中 $$IV(a) = -\\sum_{v=1}^{V} \\frac{|D^v|}{|D|} \\log_2 \\frac{|D^v|}{|D|}$$ 为属性 <span class="katex-inline">a</span> 的"固有值"。</p>
        </div>
        <p><strong>C4.5的启发式：</strong>先从候选属性中选出信息增益高于平均水平的，再从中选增益率最高的（不直接选增益率最大的）。</p>
        `,
        formulas: ['Gain(D,a) = Ent(D) - Σ |D^v|/|D| Ent(D^v)']
      },
      {
        id: 'ch4-3', title: '基尼指数计算', tag: '计算',
        content: `
        <p><strong>基尼值：</strong>从数据集 <span class="katex-inline">D</span> 中随机抽取两个样本，其类别标记不一致的概率。</p>
        <div class="formula-box">
          <div class="formula-title">基尼值公式：</div>
          <p>$$Gini(D) = \\sum_{k=1}^{|\\mathcal{Y}|} \\sum_{k' \\neq k} p_k p_{k'} = 1 - \\sum_{k=1}^{|\\mathcal{Y}|} p_k^2$$</p>
          <div class="formula-title">属性 a 的基尼指数：</div>
          <p>$$Gini\\_index(D, a) = \\sum_{v=1}^{V} \\frac{|D^v|}{|D|} Gini(D^v)$$</p>
        </div>
        <p><strong>CART决策树：</strong>使用基尼指数选择划分属性，选择基尼指数最小的属性。</p>
        `,
        formulas: ['Gini(D) = 1 - Σ p_k^2', 'Gini_index(D,a) = Σ |D^v|/|D| Gini(D^v)']
      },
      {
        id: 'ch4-4', title: '剪枝处理', tag: '计算',
        content: `
        <p><strong>目的：</strong>对抗<strong>过拟合</strong>。通过删除一些分支来提高泛化性能。</p>
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th></th><th>预剪枝 (Pre-pruning)</th><th>后剪枝 (Post-pruning)</th></tr>
          <tr><td><strong>时机</strong></td><td>在生成过程中</td><td>生成完整树后</td></tr>
          <tr><td><strong>做法</strong></td><td>划分前用验证集评估，若划分不能提升精度则停止</td><td>自底向上考察节点，若替换为叶节点后验证集精度提升则剪枝</td></tr>
          <tr><td><strong>优点</strong></td><td>降低过拟合风险，减少训练开销</td><td>欠拟合风险小，泛化性能通常更好</td></tr>
          <tr><td><strong>缺点</strong></td><td>可能欠拟合（贪心禁止本应有益的划分）</td><td>训练开销大</td></tr>
        </table>
        </div>
        <div class="step-box">
          <div class="step-title">剪枝计算步骤：</div>
          <ol>
            <li>将数据集划分为训练集和验证集</li>
            <li>在训练集上生成决策树</li>
            <li>用验证集评估每个节点的剪枝前后精度</li>
            <li>若精度不降低 → 剪枝（将该节点变为叶节点，类别为训练样本中最多的类）</li>
          </ol>
        </div>
        `,
        formulas: []
      },
      {
        id: 'ch4-5', title: '连续值与缺失值处理', tag: '概念',
        content: `
        <p><strong>连续值处理（二分法）：</strong></p>
        <ol>
          <li>将连续属性值从小到大排序</li>
          <li>取相邻值的中点为候选划分点：对属性 <span class="katex-inline">a</span> 的 <span class="katex-inline">n</span> 个取值，有 <span class="katex-inline">n-1</span> 个候选划分点</li>
          <li>在每个候选划分点上计算信息增益，选最优划分点</li>
        </ol>
        <p><strong>缺失值处理（权重分配）：</strong></p>
        <ul>
          <li>计算信息增益时，只考虑属性值不缺失的样本，再乘以无缺失样本比例</li>
          <li>划分样本时，缺失值样本以不同概率（权重）划分到各子节点</li>
        </ul>
        <div class="formula-box">
          <div class="formula-title">带缺失值的信息增益：</div>
          <p>$$Gain(D, a) = \\rho \\times Gain(\\tilde{D}, a)$$</p>
          <p>其中 <span class="katex-inline">\\rho</span> 为无缺失样本比例，<span class="katex-inline">\\tilde{D}</span> 为无缺失样本子集。</p>
        </div>
        `,
        formulas: ['Gain(D,a) = ρ × Gain(D̃,a)']
      }
    ]
  },

  // ===== 第五章：神经网络 =====
  {
    id: 'ch5', num: 5, title: '神经网络', priority: 'high',
    desc: '感知机、BP算法完整推导（重点！）、局部/全局最小、CNN。计算题核心！',
    sections: [
      {
        id: 'ch5-1', title: '感知机 (Perceptron)', tag: '概念',
        content: `
        <p><strong>激活函数：</strong>阶跃函数（sign函数），输出 +1 或 -1。</p>
        <div class="formula-box">
          <div class="formula-title">感知机模型：</div>
          <p>$$y = sign(w^T x - \\theta) = sign(\\sum_i w_i x_i - \\theta)$$</p>
        </div>
        <p><strong>学习策略（权重更新规则）：</strong>对误分类样本进行修正</p>
        <div class="formula-box">
          <div class="formula-title">权重与阈值更新：</div>
          <p>$$w_i \\leftarrow w_i + \\eta \\cdot y \\cdot x_i$$</p>
          <p>$$\\theta \\leftarrow \\theta - \\eta \\cdot y$$</p>
          <p>其中 <span class="katex-inline">\\eta</span> 为学习率，<span class="katex-inline">y</span> 为真实标记（+1或-1）。</p>
        </div>
        <p><strong>局限性：</strong>只能解决<strong>线性可分</strong>问题。异或(XOR)问题不可解。</p>
        `,
        formulas: ['y = sign(w^T x - θ)', 'w_i ← w_i + η y x_i']
      },
      {
        id: 'ch5-2', title: 'BP算法完整推导', tag: '计算',
        content: `
        <div class="warn-box"><strong>⚠️ 考试要求：</strong>需写完整推导步骤，不可仅写中间结果！严格按教材流程。</div>
        <p><strong>BP（误差逆传播）算法：</strong>最成功的神经网络训练算法，基于梯度下降策略。</p>
        <div class="step-box">
          <div class="step-title">BP算法推导步骤（考试完整流程）：</div>
          <p><strong>Step 1 - 定义误差：</strong>对训练例 <span class="katex-inline">(x_k, y_k)</span>，输出层误差：</p>
          <p>$$E_k = \\frac{1}{2} \\sum_{j=1}^{l} (\\hat{y}_j^k - y_j^k)^2$$</p>
          <p><strong>Step 2 - 隐层到输出层权值</strong> <span class="katex-inline">w_{hj}</span> 的梯度（链式法则）：</p>
          <p>$$\\frac{\\partial E_k}{\\partial w_{hj}} = \\frac{\\partial E_k}{\\partial \\hat{y}_j^k} \\cdot \\frac{\\partial \\hat{y}_j^k}{\\partial \\beta_j} \\cdot \\frac{\\partial \\beta_j}{\\partial w_{hj}}$$</p>
          <p>其中 <span class="katex-inline">\\beta_j = \\sum_h w_{hj} b_h</span> 为输出层第 <span class="katex-inline">j</span> 个神经元的输入</p>
          <p>Sigmoid函数性质：<span class="katex-inline">f'(x) = f(x)(1-f(x))</span></p>
          <p><strong>Step 3 - 定义</strong> <span class="katex-inline">g_j</span>（输出层神经元的梯度项）：</p>
          <p>$$g_j = \\hat{y}_j^k (1 - \\hat{y}_j^k)(y_j^k - \\hat{y}_j^k)$$</p>
          <p>则：$$\\Delta w_{hj} = \\eta \\cdot g_j \\cdot b_h$$</p>
          <p><strong>Step 4 - 输入层到隐层权值</strong> <span class="katex-inline">v_{ih}</span> 的梯度：</p>
          <p>定义 <span class="katex-inline">e_h</span>（隐层神经元的梯度项）：</p>
          <p>$$e_h = b_h(1-b_h) \\sum_{j=1}^{l} w_{hj} g_j$$</p>
          <p>则：$$\\Delta v_{ih} = \\eta \\cdot e_h \\cdot x_i$$</p>
        </div>
        <div class="exam-tip"><strong>📌 答题规范：</strong>必须先写误差函数E_k → 对每个参数求偏导（链式法则展开）→ 给出梯度项定义 → 写出更新公式。不要跳过中间步骤！</div>
        `,
        formulas: ['E_k = 0.5 Σ (ŷ_j - y_j)²', 'g_j = ŷ_j(1-ŷ_j)(y_j-ŷ_j)', 'e_h = b_h(1-b_h) Σ w_{hj} g_j']
      },
      {
        id: 'ch5-3', title: '局部最小与全局最小', tag: '概念',
        content: `
        <p><strong>局部最小(Local Minimum)：</strong>梯度为零但并非全局最小的点。神经网络训练容易陷入局部最小。</p>
        <p><strong>全局最小(Global Minimum)：</strong>整个参数空间中误差最小的点。</p>
        <p><strong>跳出局部最小的策略：</strong></p>
        <ul>
          <li><strong>多组初始值：</strong>以不同初始参数训练多个网络，选最优</li>
          <li><strong>模拟退火：</strong>以一定概率接受更差解，概率随训练逐步降低</li>
          <li><strong>随机梯度下降：</strong>引入随机性，可能在跳出局部最小</li>
          <li><strong>遗传算法：</strong>结合演化计算搜索</li>
        </ul>
        `,
        formulas: []
      },
      {
        id: 'ch5-4', title: 'CNN（卷积神经网络）', tag: '概念',
        content: `
        <p><strong>核心特性：</strong></p>
        <ul>
          <li><strong>权值共享(Weight Sharing)：</strong>同一卷积核在整个输入上滑动，参数大幅减少</li>
          <li><strong>局部连接(Local Connectivity)：</strong>每个神经元只连接局部区域（感受野）</li>
          <li><strong>自动特征提取：</strong>无需人工设计特征，通过卷积+池化层自动学习层次化特征</li>
        </ul>
        <p><strong>池化(Pooling)：</strong>下采样操作，降低特征图维度，提供平移不变性（最大池化/平均池化）。</p>
        `,
        formulas: []
      }
    ]
  },

  // ===== 第六章：SVM =====
  {
    id: 'ch6', num: 6, title: '支持向量机(SVM)', priority: 'high',
    desc: '最大化间隔思想 + 对偶问题推导（拉格朗日乘子法）+ w和b计算 + 核函数 + 软硬间隔。计算题核心！',
    sections: [
      {
        id: 'ch6-1', title: '核心思想：最大化间隔', tag: '概念',
        content: `
        <p><strong>SVM核心思想：</strong>寻找具有<strong>最大间隔</strong>(Maximum Margin)的划分超平面，从而获得最强的<strong>鲁棒性</strong>和泛化能力。</p>
        <p><strong>支持向量：</strong>距离超平面最近且满足等号约束的样本点，即那些"撑起"间隔边界的样本。最终模型仅由支持向量决定。</p>
        <div class="formula-box">
          <div class="formula-title">基本型（硬间隔SVM）：</div>
          <p>$$\\min_{w,b} \\frac{1}{2} ||w||^2$$</p>
          <p>$$s.t.\\quad y_i(w^T x_i + b) \\ge 1, \\quad i=1,2,\\dots,m$$</p>
        </div>
        <p><strong>间隔：</strong>两个异类支持向量到超平面的距离之和 = <span class="katex-inline">\\frac{2}{||w||}</span>。</p>
        `,
        formulas: ['min 0.5||w||²', 'y_i(w^T x_i + b) ≥ 1']
      },
      {
        id: 'ch6-2', title: '对偶问题推导（拉格朗日乘子法）', tag: '计算',
        content: `
        <div class="warn-box"><strong>⚠️ 考试要求：</strong>必须完整写出拉格朗日乘子法推导过程，得到公式6.11。</div>
        <div class="step-box">
          <div class="step-title">完整推导步骤：</div>
          <p><strong>Step 1</strong> — 写出拉格朗日函数（引入乘子 <span class="katex-inline">\\alpha_i \\ge 0</span>）：</p>
          <p>$$L(w,b,\\alpha) = \\frac{1}{2}||w||^2 + \\sum_{i=1}^{m} \\alpha_i (1 - y_i(w^T x_i + b))$$</p>
          <p><strong>Step 2</strong> — 令 <span class="katex-inline">L</span> 对 <span class="katex-inline">w</span> 和 <span class="katex-inline">b</span> 的偏导为零：</p>
          <p>$$\\frac{\\partial L}{\\partial w} = w - \\sum_{i=1}^{m} \\alpha_i y_i x_i = 0 \\quad\\Rightarrow\\quad w = \\sum_{i=1}^{m} \\alpha_i y_i x_i$$</p>
          <p>$$\\frac{\\partial L}{\\partial b} = -\\sum_{i=1}^{m} \\alpha_i y_i = 0 \\quad\\Rightarrow\\quad \\sum_{i=1}^{m} \\alpha_i y_i = 0$$</p>
          <p><strong>Step 3</strong> — 代入回 <span class="katex-inline">L</span>，消去 <span class="katex-inline">w</span> 和 <span class="katex-inline">b</span>，得到对偶问题（式6.11）：</p>
          <p>$$\\max_{\\alpha} \\sum_{i=1}^{m} \\alpha_i - \\frac{1}{2} \\sum_{i=1}^{m} \\sum_{j=1}^{m} \\alpha_i \\alpha_j y_i y_j x_i^T x_j$$</p>
          <p>$$s.t.\\quad \\sum_{i=1}^{m} \\alpha_i y_i = 0, \\quad \\alpha_i \\ge 0, \\quad i=1,\\dots,m$$</p>
        </div>
        <p><strong>KKT条件：</strong><span class="katex-inline">\\alpha_i(1 - y_i(w^T x_i + b)) = 0</span>，即要么 <span class="katex-inline">\\alpha_i=0</span>，要么 <span class="katex-inline">y_i(w^T x_i+b)=1</span>（该样本是支持向量）。</p>
        `,
        formulas: ['w = Σα_i y_i x_i', 'Σα_i y_i = 0', 'max Σα_i - 0.5 ΣΣ α_iα_j y_i y_j x_i^T x_j']
      },
      {
        id: 'ch6-3', title: '超平面求解：w与b计算', tag: '计算',
        content: `
        <div class="step-box">
          <div class="step-title">计算步骤（公式6.17）：</div>
          <p><strong>Step 1</strong> — 解对偶问题，得到 <span class="katex-inline">\\alpha_i</span>（通常用SMO算法）。</p>
          <p><strong>Step 2</strong> — 计算 <span class="katex-inline">w</span>：</p>
          <p>$$w = \\sum_{i=1}^{m} \\alpha_i y_i x_i$$</p>
          <p><strong>Step 3</strong> — 计算 <span class="katex-inline">b</span>（取一个支持向量 <span class="katex-inline">(x_s, y_s)</span>，满足 <span class="katex-inline">\\alpha_s > 0</span>）：</p>
          <p>$$b = y_s - \\sum_{i \\in SV} \\alpha_i y_i x_i^T x_s$$</p>
          <p>更稳健的做法：对所有支持向量计算b后取均值。</p>
          <p><strong>Step 4</strong> — 得到决策函数：</p>
          <p>$$f(x) = sign\\left(\\sum_{i \\in SV} \\alpha_i y_i x_i^T x + b\\right)$$</p>
        </div>
        <div class="tip-box"><strong>支持向量判断：</strong>求解后 <span class="katex-inline">\\alpha_i > 0</span> 的样本即为<strong>支持向量</strong>；<span class="katex-inline">\\alpha_i = 0</span> 的样本对模型无影响。</div>
        `,
        formulas: ['w = Σα_i y_i x_i', 'b = y_s - Σα_i y_i x_i^T x_s']
      },
      {
        id: 'ch6-4', title: '核函数与软/硬间隔', tag: '概念',
        content: `
        <p><strong>核函数(Kernel Function)：</strong>将样本从原始空间映射到高维特征空间，使在原始空间非线性可分的问题在高维空间线性可分。</p>
        <div class="formula-box">
          <div class="formula-title">核函数替换：</div>
          <p>对偶问题中的内积 <span class="katex-inline">x_i^T x_j</span> 替换为 <span class="katex-inline">\\kappa(x_i, x_j)</span>（核函数）。</p>
        </div>
        <p><strong>常见核函数：</strong>线性核、多项式核、高斯核(RBF)、Sigmoid核。</p>
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th></th><th>硬间隔(Hard Margin)</th><th>软间隔(Soft Margin)</th></tr>
          <tr><td><strong>约束</strong></td><td>所有样本必须正确分类</td><td>允许部分样本不满足约束</td></tr>
          <tr><td><strong>引入</strong></td><td>无</td><td>松弛变量 <span class="katex-inline">\\xi_i \\ge 0</span></td></tr>
          <tr><td><strong>适用</strong></td><td>线性可分数据</td><td>一般数据（允许少量错误）</td></tr>
          <tr><td><strong>参数</strong></td><td>无</td><td><span class="katex-inline">C</span>（惩罚因子，控制容忍度）</td></tr>
        </table>
        </div>
        `,
        formulas: ['κ(x_i, x_j) = φ(x_i)^T φ(x_j)']
      }
    ]
  },

  // ===== 第七章：贝叶斯分类器 =====
  {
    id: 'ch7', num: 7, title: '贝叶斯分类器', priority: 'high',
    desc: '朴素贝叶斯公式7.8（条件概率计算，精确计算或比较大小）。计算题重点。',
    sections: [
      {
        id: 'ch7-1', title: '贝叶斯决策论', tag: '概念',
        content: `
        <p><strong>贝叶斯决策论：</strong>基于<strong>概率</strong>和<strong>误判损失</strong>来选择最优类别标记。</p>
        <div class="formula-box">
          <div class="formula-title">贝叶斯公式：</div>
          <p>$$P(c|x) = \\frac{P(c) \\cdot P(x|c)}{P(x)}$$</p>
          <p><span class="katex-inline">P(c)</span> — 先验概率，<span class="katex-inline">P(x|c)</span> — 类条件概率（似然），<span class="katex-inline">P(c|x)</span> — 后验概率</p>
        </div>
        <p><strong>贝叶斯最优分类器：</strong>选择使后验概率 <span class="katex-inline">P(c|x)</span> 最大的类别标记。</p>
        <p><strong>难点：</strong><span class="katex-inline">P(x|c)</span> 是所有属性上的联合概率，难以直接估计。</p>
        `,
        formulas: ['P(c|x) = P(c)P(x|c)/P(x)']
      },
      {
        id: 'ch7-2', title: '朴素贝叶斯与公式7.8', tag: '计算',
        content: `
        <div class="warn-box"><strong>⚠️ 考试重点：</strong>精确计算条件概率（公式7.8），要求能计算具体数值或比较不同类别的后验概率大小。</div>
        <p><strong>"朴素"的含义：</strong>假设所有属性<strong>相互独立</strong>（属性条件独立性假设）。</p>
        <div class="formula-box">
          <div class="formula-title">公式7.8 — 朴素贝叶斯分类器：</div>
          <p>$$P(c|x) \\propto P(c) \\prod_{i=1}^{d} P(x_i | c)$$</p>
          <p>分类决策：$$h_{nb}(x) = \\arg\\max_{c \\in \\mathcal{Y}} P(c) \\prod_{i=1}^{d} P(x_i | c)$$</p>
        </div>
        <div class="step-box">
          <div class="step-title">计算步骤：</div>
          <ol>
            <li>计算先验概率 <span class="katex-inline">P(c)</span>：每类样本数 / 总样本数</li>
            <li>对每个属性，计算条件概率 <span class="katex-inline">P(x_i | c)</span>：
              <ul>
                <li>离散属性：直接计数 <span class="katex-inline">P(x_i|c) = |D_{c,x_i}| / |D_c|</span></li>
                <li>连续属性：假设服从高斯分布 <span class="katex-inline">P(x_i|c) \\sim N(\\mu_{c,i}, \\sigma_{c,i}^2)</span></li>
              </ul>
            </li>
            <li>对每个类别计算 <span class="katex-inline">P(c) × ∏P(x_i|c)</span></li>
            <li>比较大小，选最大的那个类别（由于 <span class="katex-inline">P(x)</span> 对所有类别相同，可忽略）</li>
          </ol>
        </div>
        <div class="tip-box"><strong>拉普拉斯修正：</strong>若某属性值在训练集中未出现，概率会变成0（连乘后整体归零）。修正：计数时所有取值+1，分母+取值种类数。</div>
        `,
        formulas: ['P(c|x) ∝ P(c) Π P(x_i|c)', 'h_nb(x) = argmax_c P(c) Π P(x_i|c)']
      }
    ]
  },

  // ===== 第八章：集成学习 =====
  {
    id: 'ch8', num: 8, title: '集成学习', priority: 'high',
    desc: '基本概念（好而不同）+ Boosting vs Bagging + 随机森林。简答题高频。',
    sections: [
      {
        id: 'ch8-1', title: '基本概念与"好而不同"', tag: '概念',
        content: `
        <p><strong>集成学习：</strong>通过构建并结合多个学习器来完成学习任务。</p>
        <ul>
          <li><strong>同质集成：</strong>个体学习器类型相同（如全是决策树）→ 个体学习器称为"基学习器"</li>
          <li><strong>异质集成：</strong>个体学习器类型不同（如决策树+SVM+神经网络）→ 个体学习器称为"组件学习器"</li>
        </ul>
        <div class="exam-tip">
        <strong>📌 "好而不同"原则：</strong>个体学习器要有一定<strong>准确性</strong>（不能太差），同时要有<strong>多样性</strong>（学习器之间要有差异）。集成学习之所以有效，正是因为不同的学习器会犯不同的错误，结合后可以互相纠正。
        </div>
        `,
        formulas: []
      },
      {
        id: 'ch8-2', title: 'Boosting vs Bagging', tag: '概念',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th>对比维度</th><th>Boosting</th><th>Bagging</th></tr>
          <tr><td><strong>代表算法</strong></td><td>AdaBoost、GBDT、XGBoost</td><td>随机森林</td></tr>
          <tr><td><strong>训练方式</strong></td><td><strong>串行</strong>生成</td><td><strong>并行</strong>生成</td></tr>
          <tr><td><strong>样本权重</strong></td><td>根据上一轮错误调整权重</td><td>自助采样法，各样本等权</td></tr>
          <tr><td><strong>结合策略</strong></td><td>加权投票（准确率高的权重大）</td><td>简单投票/平均</td></tr>
          <tr><td><strong>降低什么</strong></td><td>主要降低<strong>偏差</strong></td><td>主要降低<strong>方差</strong></td></tr>
          <tr><td><strong>关注点</strong></td><td>关注<strong>偏差</strong>，逐步拟合残差</td><td>关注<strong>方差</strong>，通过平均平滑波动</td></tr>
        </table>
        </div>
        <div class="exam-tip"><strong>📌 关联考点：</strong>偏差-方差权衡（第2章）是理解Boosting/Bagging差异的理论基础。偏差大→用Boosting；方差大→用Bagging。</div>
        `,
        formulas: []
      },
      {
        id: 'ch8-3', title: '随机森林 (Random Forest)', tag: '概念',
        content: `
        <p><strong>随机森林 = Bagging + 决策树 + 属性扰动</strong></p>
        <p><strong>多样性体现（双重随机）：</strong></p>
        <ul>
          <li><strong>样本扰动：</strong>每个基决策树使用不同的自助采样集（Bootstrap样本）</li>
          <li><strong>属性扰动：</strong>每个节点划分时，从全部属性中随机选取一个子集，再从子集中选最优属性</li>
        </ul>
        <p><strong>推荐：</strong>属性子集大小取 <span class="katex-inline">k = \\log_2 d</span>（分类）或 <span class="katex-inline">k = d/3</span>（回归），其中 <span class="katex-inline">d</span> 为属性总数。</p>
        <p><strong>优势：</strong>双重随机使个体学习器多样性大幅增加，泛化性能优异，训练可并行。</p>
        `,
        formulas: ['k = log_2 d']
      }
    ]
  },

  // ===== 第九章：聚类 =====
  {
    id: 'ch9', num: 9, title: '聚类', priority: 'high',
    desc: '性能度量（外部/内部指标）+ K-Means完整流程 + LVQ + 密度聚类思想。',
    sections: [
      {
        id: 'ch9-1', title: '聚类性能度量', tag: '概念',
        content: `
        <p><strong>外部指标（有参考模型）：</strong>越大越好</p>
        <ul>
          <li><strong>Jaccard系数(JC)：</strong>衡量聚类结果与参考模型的相似度，$$JC = \\frac{a}{a+b+c}$$</li>
          <li><strong>FM指数(Fowlkes-Mallows)：</strong>$$FMI = \\sqrt{\\frac{a}{a+b} \\cdot \\frac{a}{a+c}}$$</li>
        </ul>
        <p><strong>内部指标（无参考模型）：</strong></p>
        <ul>
          <li><strong>DB指数(Davies-Bouldin)：越小越好</strong>，衡量簇内紧密与簇间分离的比值</li>
          <li><strong>DI指数(Dunn Index)：越大越好</strong>，$$DI = \\frac{\\text{最小簇间距离}}{\\text{最大簇内直径}}$$</li>
        </ul>
        <div class="tip-box"><strong>记忆口诀：</strong>JC和FMI→越大越好；DB→越小越好；DI→越大越好。都是有"大"的方向，只有DB是越小越好。</div>
        `,
        formulas: ['JC = a/(a+b+c)', 'FMI = √(a/(a+b) · a/(a+c))']
      },
      {
        id: 'ch9-2', title: 'K-Means完整流程', tag: '计算',
        content: `
        <div class="warn-box"><strong>⚠️ 考试要求：</strong>写出完整的迭代计算过程，包括均值向量更新及簇划分。</div>
        <div class="step-box">
          <div class="step-title">K-Means算法流程：</div>
          <p><strong>输入：</strong>样本集 <span class="katex-inline">D = \\{x_1, x_2, ..., x_m\\}</span>，聚类簇数 <span class="katex-inline">k</span></p>
          <p><strong>Step 1</strong> — 随机选择 <span class="katex-inline">k</span> 个样本作为初始均值向量 <span class="katex-inline">\\{\\mu_1, \\mu_2, ..., \\mu_k\\}</span></p>
          <p><strong>Step 2</strong> — 对每个样本 <strong>划分簇</strong>：计算到各均值向量的距离，归入最近的簇</p>
          <p>$$C_i = \\{x | \\|x - \\mu_i\\|_2 \\le \\|x - \\mu_j\\|_2, \\forall j \\neq i\\}$$</p>
          <p><strong>Step 3</strong> — <strong>更新均值向量</strong>：</p>
          <p>$$\\mu_i' = \\frac{1}{|C_i|} \\sum_{x \\in C_i} x$$</p>
          <p><strong>Step 4</strong> — 重复步骤2-3，直到均值向量不再变化（或变化足够小）</p>
        </div>
        `,
        formulas: ['μ_i\' = (1/|C_i|) Σ x']
      },
      {
        id: 'ch9-3', title: 'LVQ（学习向量量化）', tag: '概念',
        content: `
        <p><strong>核心思想：</strong>LVQ假设数据样本带有类别标记，利用监督信息辅助聚类。</p>
        <p><strong>更新规则：</strong>找到最近的原型向量后，若类别相同则"拉近"，类别不同则"推远"。原型向量逼近同类样本、远离异类样本。</p>
        `,
        formulas: ['p\' = p + η(x-p) (同类)', 'p\' = p - η(x-p) (异类)']
      },
      {
        id: 'ch9-4', title: '密度聚类 (DBSCAN)', tag: '概念',
        content: `
        <p><strong>核心思想：</strong>基于样本分布的<strong>紧密程度</strong>确定聚类结构。从核心对象出发，不断向密度可达的区域扩张，最终得到包含核心点和边界点的<strong>最大化区域</strong>。</p>
        <p><strong>关键概念：</strong></p>
        <ul>
          <li><strong>ε-邻域：</strong>距离不超过ε的样本集合</li>
          <li><strong>核心对象：</strong>ε-邻域内样本数 ≥ MinPts</li>
          <li><strong>密度直达/可达/相连</strong> — 基于核心对象的连接关系</li>
        </ul>
        <p><strong>优势：</strong>能发现任意形状的簇，对噪声鲁棒。</p>
        `,
        formulas: []
      }
    ]
  },

  // ===== 第十章：降维与度量学习 =====
  {
    id: 'ch10', num: 10, title: '降维与度量学习', priority: 'low',
    desc: 'PCA核心思想与降维步骤 + 流形学习。题型：选择/判断为主。',
    sections: [
      {
        id: 'ch10-1', title: 'PCA（主成分分析）', tag: '概念',
        content: `
        <p><strong>核心思想：</strong></p>
        <ul>
          <li><strong>最大可分性：</strong>投影后的样本点在新空间中尽可能分开（方差最大化）</li>
          <li><strong>线性无关性：</strong>各主成分之间相互正交（协方差为0）</li>
        </ul>
        <div class="step-box">
          <div class="step-title">PCA降维步骤（教材P231流程）：</div>
          <ol>
            <li>对所有样本进行<strong>中心化</strong>：<span class="katex-inline">x_i \\leftarrow x_i - \\frac{1}{m}\\sum x_i</span></li>
            <li>计算样本的<strong>协方差矩阵</strong> <span class="katex-inline">XX^T</span></li>
            <li>对协方差矩阵做<strong>特征值分解</strong></li>
            <li>取最大的 <span class="katex-inline">d'</span> 个特征值对应的<strong>特征向量</strong>构成投影矩阵 <span class="katex-inline">W</span></li>
            <li>输出投影结果：<span class="katex-inline">Z = W^T X</span></li>
          </ol>
        </div>
        `,
        formulas: ['XX^T 特征分解', 'Z = W^T X']
      },
      {
        id: 'ch10-2', title: '流形学习', tag: '概念',
        content: `
        <p><strong>核心假设：</strong>高维数据分布在某个<strong>低维流形</strong>上。</p>
        <p><strong>局部欧式空间同胚：</strong>流形在局部与欧式空间<strong>同胚</strong>（局部可近似为线性空间）。</p>
        <p><strong>测地线距离(Isomap)：</strong>用近邻图上两点间<strong>最短路径</strong>近似流形上的测地线距离，再在低维空间中保持这些距离。</p>
        `,
        formulas: []
      }
    ]
  },

  // ===== 第十一章：特征选择 =====
  {
    id: 'ch11', num: 11, title: '特征选择', priority: 'low',
    desc: '方法分类（过滤式/包裹式/嵌入式）+ L1 vs L2范数。题型：选择/判断。',
    sections: [
      {
        id: 'ch11-1', title: '特征选择方法分类', tag: '概念',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th>类型</th><th>特点</th><th>代表方法</th></tr>
          <tr><td><strong>过滤式(Filter)</strong></td><td>先用特征选择过滤特征，再训练学习器。特征选择与后续学习器无关</td><td>Relief、信息增益</td></tr>
          <tr><td><strong>包裹式(Wrapper)</strong></td><td>直接把最终学习器的性能作为特征子集的评价标准</td><td><strong>LVW（拉斯维加斯方法）</strong>——随机搜索</td></tr>
          <tr><td><strong>嵌入式(Embedded)</strong></td><td>将特征选择与学习器训练融为一体，在同一优化过程中完成</td><td>L1正则化(Lasso)、决策树</td></tr>
        </table>
        </div>
        `,
        formulas: []
      },
      {
        id: 'ch11-2', title: 'L1 vs L2 范数', tag: '概念',
        content: `
        <div class="compare-table-wrapper">
        <table class="compare-table">
          <tr><th></th><th>L1范数（Lasso）</th><th>L2范数（Ridge）</th></tr>
          <tr><td><strong>共同点</strong></td><td colspan="2">均可降低过拟合风险（正则化）</td></tr>
          <tr><td><strong>差异</strong></td><td><strong>更容易获得稀疏解</strong>（部分特征权重为0），天然具备特征选择能力</td><td>不易获得稀疏解，权重趋于均匀缩小</td></tr>
          <tr><td><strong>几何解释</strong></td><td>约束区域为菱形，等值线易在坐标轴上相交</td><td>约束区域为圆形，等值线不易与坐标轴相交</td></tr>
        </table>
        </div>
        <div class="exam-tip"><strong>📌 常考点：</strong>L1范数更容易获得<strong>稀疏解</strong>，因此可用于<strong>嵌入式特征选择</strong>（如Lasso回归）。</div>
        `,
        formulas: ['L1: ||w||_1 = Σ|w_i|', 'L2: ||w||_2² = Σ w_i²']
      }
    ]
  }
];
