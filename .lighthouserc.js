// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      // 빌드 후 정적 파일을 서버로 띄워 검사하거나, 특정 URL을 지정합니다.
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/"],
      numberOfRuns: 3, // 결과의 신뢰도를 위해 3번 실행 후 평균값 사용
      settings: {
        waitOnServer: true, // 서버가 완전히 뜰 때까지 기다리는 시간을 줍니다 (최대 60초)
      },
    },
    upload: {
      target: "temporary-public-storage", // 결과를 Lighthouse 공용 스토리지에 업로드 (임시 링크 제공)
    },
    assert: {
      assertions: {
        // 성능, 접근성, 권장사항, SEO 점수가 80점 미만이면 경고(warn) 또는 에러(error)
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
};
