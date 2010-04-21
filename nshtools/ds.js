/**
 * ds - data structure module. Implements simple stacks and queues.
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2010 R. S. Doiel, all rights reserved
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the R. S. Doiel nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

const STACK = 1;
const QUEUE = 2;

createDataStructure = function (dsType) {
  var self = {};

  self.ds = [];
  if (dsType === undefined) {
    self.dsType = QUEUE;
  } else {
    self.dsType = dsType;  
  }

  self.view = function (pos) {
    if (self.ds.length === 0) {
      return;
    }
    switch (pos) {
      case 'top':
        if (self.dsType === STACK) {
          pos = self.ds.length - 1;      
        } else {
          pos = 0;
        }
        break;
      case 'bottom':
        if (self.dsType === STACK) {
          pos = 0;    
        } else {
          pos = self.ds.length - 1;            
        }
        break;
    }
    if (pos < 0) {
      pos = self.ds.length + pos;
    }
    if (pos < 0) {
      pos = 0;
    }
    if (pos >= self.ds.length) {
      pos = self.ds.length - 1 ;
    }
    return self.ds[pos];
  }

  self.pop = function () { 
    return self.ds.pop();
  };

  self.push = function (item) { 
    return self.ds.push(item); 
  };

  self.isEmpty = function () { 
    return (self.ds.length === 0); 
  };
  
  self.size = function () { 
    return (self.ds.length); 
  };

  self.top = function () {
    if (self.ds.length > 0) {
      if (self.dsType === QUEUE) {
        return self.ds[0];
      }
      return self.ds[self.ds.length - 1];   
    }
    return;
  };

  self.bottom = function () {
    if (self.ds.length > 0) {
      if (self.dsType === QUEUE) {
        return self.ds[self.ds.length - 1];    
      }
      return self.ds[0];
    }
    return;
  };

  self.popAll = function () {
    if (self.ds.length > 0) {
      /* Pop implies STACK/FILO so reverse array */
      self.ds.reverse();
      var s = self.ds;

      delete self.ds;
      self.ds = [];
      return s;
    }
    return;
  };

  self.shift = function () { 
    return self.ds.shift();
  };

  self.shiftAll = function () {
    if (self.ds.length > 0) {
      var q = self.ds;

      delete self.ds;
      self.ds = [];
      return q;
    }
    return;
  };

  return self;
};

Stack = function() {
  return createDataStructure(STACK);
};

Queue = function() {
  return createDataStructure(QUEUE);
};

exports.Stack = Stack;
exports.Queue = Queue;

