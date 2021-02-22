const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const {createSandbox} = require('sinon');

const TodoRepository = require('../src/todoRepository');

describe('todoRepository', () => {
  let todoRepository;
  let sandbox;

  before(() => {
    todoRepository = new TodoRepository();
    sandbox = createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  describe('methods signature', () => {
    it('should call find from lokijs', () => {
      const mockDatabase = [
        {
          name: 'Maria',
          age: 27,
          meta: { revision: 0, created: 1613993323383, version: 0 },
          '$loki': 1
        },
      ]

      const functionName = "find";
      const expectReturn = mockDatabase;
      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn);

      const result = todoRepository.list();
      expect(result).to.be.deep.equal(expectReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    })

    it('should call insertOne from lokijs', () => {
      const functionName = "insertOne";
      const expectReturn = true;
      
      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn);

      const data = {name: 'Nathália'};

      const result = todoRepository.create(data);
      expect(result).to.be.ok;
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
    })    
  })
})