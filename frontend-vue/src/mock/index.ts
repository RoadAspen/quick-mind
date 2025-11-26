import Mock from 'mockjs';

const Random = Mock.Random;

const SuccessData = {
  code: 'A001',
  success: true,
  msg: '获取成功'
};
// 获取视频列表
Mock.mock('/api/v1/audios', 'get', {
  ...SuccessData,
  data: {
    'audios|2-10': [
      {
        'id|+1': 1,
        'title|1': Random.csentence(3, 13),
        'durationSeconds': Random.natural(30, 1800),
        'sizeBytes': Random.natural(300, 180000),
        'format': 'mp3',
        'url': Random.url(),
        'uploadedTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
        'status|1': [
          'transcribing',
          'pendingSummary',
          'generatingSummary',
          'summaryGenerated'
        ],
        'transcriptId': 'xxxxxx',
        'moms|0-10': [
          {
            'momId': 'xxxxxx',
            'version|1': ['v1', 'v2', 'v3'],
            'generatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
          }
        ]
      }
    ]
  }
});

// 获取转义文本列表
Mock.mock(/\/api\/v1\/transcripts\/xxxxxx/, 'get', {
  ...SuccessData,
  data: {
    'transcriptId': Random.natural(10),
    'text': Random.cparagraph(10, 30),
    'sentences|100-1000': [{ 'rowNum|+1': 1, 'content': Random.cparagraph(1) }]
  }
});
// 获取转义文本列表
Mock.mock(/\/api\/v1\/transcripts\/xxxxxx\/moms/, 'post', {
  ...SuccessData,
  data: Random.cparagraph(40, 50)
});

// 编辑转义文本
Mock.mock(/\/api\/v1\/transcripts\/xxxxxx\/sentences\/xxxxxx/, 'PUT', {
  ...SuccessData,
  data: Random.ctitle(10, 20)
});
