// Files shown in the hero code editor. Each line is a list of [tokenClass, text]; '' = plain text.
// Token classes: ta annotation, tk keyword, tx type, tn method, ts string, tm constant/number, tc comment.
const I8 = ['', '        '];
const I4 = ['', '    '];

export const IDE_FILES = [
  {
    name: 'HireMohamadTest.java', badge: 'J', color: '#E76F00',
    lines: [
      [['ta', '@SpringBootTest']],
      [['tk', 'class'], ['', ' '], ['tx', 'HireMohamadTest'], ['', ' {']],
      [],
      [I4, ['ta', '@Test']],
      [I4, ['tk', 'void'], ['', ' '], ['tn', 'yourTeam_shipsFaster_afterHiring'], ['', '() {']],
      [I8, ['tk', 'var'], ['', ' team = '], ['tk', 'new'], ['', ' Team('], ['ts', '"Your Company"'], ['', ');']],
      [I8, ['', 'team.'], ['tn', 'hire'], ['', '(MohamadNaji.'], ['tk', 'class'], ['', ');']],
      [],
      [I8, ['tn', 'assertThat'], ['', '(team.'], ['tn', 'apis'], ['', '()).'], ['tn', 'areDocumented'], ['', '();']],
      [I8, ['tn', 'assertThat'], ['', '(team.'], ['tn', 'bugs'], ['', '()).'], ['tn', 'areCaughtEarly'], ['', '();']],
      [I8, ['tn', 'assertThat'], ['', '(team.'], ['tn', 'ledger'], ['', '()).'], ['tn', 'isBalanced'], ['', '();']],
      [['', '    }']],
      [['', '}']],
    ],
    run: [
      ['c-mut', '> Task :compileTestJava'],
      ['c-mut', '> Task :test'],
      ['', 'HireMohamadTest > yourTeam_shipsFaster_afterHiring() ', ['c-ok', 'PASSED']],
      ['c-ok', '✓ BUILD SUCCESSFUL in 0.84s · 1 test passed'],
    ],
  },
  {
    name: 'MohamadNaji.java', badge: 'C', color: '#3D7BD9',
    lines: [
      [['ta', '@Service']],
      [['tk', 'public class'], ['', ' '], ['tx', 'MohamadNaji'], ['', ' '], ['tk', 'implements'], ['', ' Engineer {']],
      [],
      [I4, ['tk', 'private final'], ['', ' Stack stack =']],
      [I8, ['', 'Stack.'], ['tn', 'of'], ['', '('], ['tm', 'JAVA_21'], ['', ', '], ['tm', 'SPRING_BOOT'], ['', ', '], ['tm', 'VUE'], ['', ', '], ['tm', 'SQL'], ['', ');']],
      [],
      [I4, ['ta', '@Override']],
      [I4, ['ta', '@Transactional']],
      [I4, ['tk', 'public'], ['', ' Delivery '], ['tn', 'solve'], ['', '(Problem problem) {']],
      [I8, ['tk', 'return'], ['', ' problem.'], ['tn', 'understand'], ['', '()']],
      [['', '                .'], ['tn', 'design'], ['', '()']],
      [['', '                .'], ['tn', 'build'], ['', '(stack)']],
      [['', '                .'], ['tn', 'test'], ['', '()']],
      [['', '                .'], ['tn', 'ship'], ['', '();']],
      [['', '    }']],
      [['', '}']],
    ],
    run: [
      ['c-mut', '> Task :bootRun'],
      ['c-info', 'Tomcat started on port 8080 (http)'],
      ['c-ok', 'Started MohamadNaji in 0.84 seconds (JVM running for 7 years)'],
    ],
  },
  {
    name: 'application.yml', badge: 'Y', color: '#8C6BD8',
    lines: [
      [['tk', 'spring'], ['', ':']],
      [['', '  '], ['tk', 'application'], ['', ':']],
      [['', '    '], ['tk', 'name'], ['', ': '], ['ts', 'mohamad-naji']],
      [],
      [['tk', 'developer'], ['', ':']],
      [['', '  '], ['tk', 'role'], ['', ': '], ['ts', 'Full Stack Developer']],
      [['', '  '], ['tk', 'location'], ['', ': '], ['ts', 'Montreal, QC']],
      [['', '  '], ['tk', 'experience'], ['', ': '], ['tm', '7y']],
      [['', '  '], ['tk', 'stack'], ['', ': ['], ['ts', 'java, spring-boot, vue, quasar, sql'], ['', ']']],
      [['', '  '], ['tk', 'open-to'], ['', ': ['], ['ts', 'backend, full-stack'], ['', ']']],
    ],
    run: [
      ['c-mut', 'Binding developer.* from application.yml'],
      ['c-ok', '✓ developer.open-to = [backend, full-stack]'],
    ],
  },
];
